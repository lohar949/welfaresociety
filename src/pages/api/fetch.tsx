import { google, drive_v3 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';

const getDriveClient = (): drive_v3.Drive => {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}';
  const credentials = JSON.parse(raw);
  if (!credentials.private_key) {
    throw new Error('Google service account private_key missing.');
  }
  credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
};

const listFolderFiles = async (
  drive: drive_v3.Drive,
  folderId: string
): Promise<drive_v3.Schema$File[]> => {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType)',
  });
  return res.data.files || [];
};

const getFileContent = async (
  drive: drive_v3.Drive,
  fileId: string
): Promise<string> => {
  const res = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  return new Promise((resolve, reject) => {
    let data = '';
    (res.data as Readable)
      .on('data', chunk => (data += chunk))
      .on('end', () => resolve(data))
      .on('error', err => reject(err));
  });
};

const parseTextData = (text: string): { index: string; name: string; achievement: string }[] => {
  const entries: { index: string; name: string; achievement: string }[] = [];
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    const [indexRaw, nameRaw, ...achievementParts] = line.split(',');
    const index = indexRaw?.trim();
    const name = nameRaw?.trim();
    const achievement = achievementParts.join(',').trim();
    if (index && name && achievement) {
      entries.push({ index, name, achievement });
    }
  }
  return entries;
};

const mapImages = (files: drive_v3.Schema$File[]): Map<string, string> => {
  const map = new Map<string, string>();
  for (const file of files) {
    const match = file.name?.match(/^(\d+)/);
    if (match && file.id) {
      map.set(match[1], `https://drive.google.com/uc?export=view&id=${file.id}`);
    }
  }
  return map;
};

const getFirstTxtFileContent = async (
  drive: drive_v3.Drive,
  files: drive_v3.Schema$File[],
  label: string
): Promise<string> => {
  const txtFile = files.find(file => file.name?.endsWith('.txt'));
  if (!txtFile || !txtFile.id) {
    throw new Error(`No .txt file found in the "${label}" folder.`);
  }
  return await getFileContent(drive, txtFile.id);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const drive = getDriveClient();

    // Your folder IDs here
    const folderIds = {
      aimages: '1Bzwok3WJcXVR1J-KHoIA86lGKUhguEq-',
      anames: '14aDxnGgBkkMj1vCZRshYX7S1nEmSwI_p',
      memberimage: '1MdfSOaliW0TIZXhz-F-Xd-HnUe9CF-Hk',
      membername: '1rivM0udLfK4-Z3tH0V8lx0s1rhjyiRjf',
      events: '1wRrWiwuLR2oTpfF6iraEEcvUjqGb-w7f',
      mentorname: '1vzLjJ_kUJCiE9olxjS7cJz-pTAKRAro2',
      mentorimage: '1mTmpFuIrxfidLg4Qa1_vf5MzMECx59Iy',
    };

    const [
      aImageFiles,
      aNameFiles,
      memberImageFiles,
      memberNameFiles,
      eventImageFiles,
      mentorNameFiles,
      mentorImageFiles,
    ] = await Promise.all([
      listFolderFiles(drive, folderIds.aimages),
      listFolderFiles(drive, folderIds.anames),
      listFolderFiles(drive, folderIds.memberimage),
      listFolderFiles(drive, folderIds.membername),
      listFolderFiles(drive, folderIds.events),
      listFolderFiles(drive, folderIds.mentorname),
      listFolderFiles(drive, folderIds.mentorimage),
    ]);

    const [aText, memberText, mentorText] = await Promise.all([
      getFirstTxtFileContent(drive, aNameFiles, 'anames'),
      getFirstTxtFileContent(drive, memberNameFiles, 'membername'),
      getFirstTxtFileContent(drive, mentorNameFiles, 'mentorname'),
    ]);

    const [aData, memberData, mentorData] = [
      parseTextData(aText),
      parseTextData(memberText),
      parseTextData(mentorText),
    ];

    const [aImageMap, memberImageMap, mentorImageMap] = [
      mapImages(aImageFiles),
      mapImages(memberImageFiles),
      mapImages(mentorImageFiles),
    ];

    const achievements = aData.map(({ index, name, achievement }) => ({
      name,
      achievement,
      image: aImageMap.get(index) || '',
    }));

    const members = memberData.map(({ index, name, achievement }) => ({
      name,
      achievement,
      image: memberImageMap.get(index) || '',
    }));

    const mentors = mentorData.map(({ index, name, achievement }) => ({
      name,
      achievement,
      image: mentorImageMap.get(index) || '',
    }));

    const events = eventImageFiles.map(file => `https://drive.google.com/uc?export=view&id=${file.id}`);

    res.status(200).json({ achievements, members, mentors, events });
  } catch (err: any) {
    console.error('Google Drive fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}
