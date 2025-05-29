import { google, drive_v3 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper to run middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });
}

// Load credentials from JSON-string env variable
let credentials;
try {
  const jsonString = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!jsonString) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set');
  }

  // Parse JSON string
  const parsedCreds = JSON.parse(jsonString);

  if (!parsedCreds.private_key || !parsedCreds.client_email) {
    throw new Error('Missing required fields (private_key or client_email) in credentials');
  }

  // Replace literal \n with actual newlines in private_key
  credentials = {
    ...parsedCreds,
    private_key: parsedCreds.private_key.replace(/\\n/g, '\n').trim(),
  };

  console.log('Credentials loaded for:', credentials.client_email);
} catch (error: any) {
  console.error('Error initializing credentials:', error.message);
  throw new Error('Failed to initialize Google credentials: ' + error.message);
}

const getDriveClient = (): drive_v3.Drive => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    return google.drive({ version: 'v3', auth });
  } catch (error: any) {
    console.error('Error creating drive client:', error.message);
    throw error;
  }
};

const getImageUrl = (fileId: string | null | undefined): string | null => {
  if (!fileId) return null;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
};

const listFolderFiles = async (
  drive: drive_v3.Drive,
  folderId: string
): Promise<drive_v3.Schema$File[]> => {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: 'files(id, name, mimeType, webContentLink)',
  });
  return res.data.files || [];
};

const getFileContent = async (
  drive: drive_v3.Drive,
  fileId: string
): Promise<string> => {
  try {
    // First, get the file metadata to check its mimeType
    const fileMetadata = await drive.files.get({
      fileId,
      fields: 'mimeType'
    });

    const mimeType = fileMetadata.data.mimeType;

    // If it's a Google Docs file
    if (mimeType?.includes('application/vnd.google-apps')) {
      const res = await drive.files.export({
        fileId,
        mimeType: 'text/plain'
      });
      return res.data as string;
    }
    
    // For binary files (like plain text files)
    const res = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'stream' }
    );

    return new Promise((resolve, reject) => {
      let data = '';
      (res.data as Readable)
        .on('data', (chunk) => (data += chunk))
        .on('end', () => resolve(data))
        .on('error', (err) => reject(err));
    });
  } catch (error: any) {
    console.error(`Error getting file content for file ${fileId}:`, error);
    throw error;
  }
};

const parseTextData = (
  text: string
): { index: string; name: string; achievement: string }[] => {
  const entries: { index: string; name: string; achievement: string }[] = [];
  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    const [indexRaw, nameRaw, ...achievementParts] = line.split(',');
    const index = indexRaw?.trim();
    const name = nameRaw?.trim();
    // If there are achievement parts, join them, otherwise leave achievement empty
    const achievement = achievementParts.length > 0 ? achievementParts.join(',').trim() : '';
    
    if (index && name) {
      console.log(`Parsing line: index=${index}, name=${name}, achievement=${achievement}`);
      entries.push({ index, name, achievement });
    }
  }
  return entries;
};

const mapImages = (files: drive_v3.Schema$File[]): Map<string, string | null> => {
  const map = new Map<string, string | null>();
  console.log('Processing files for image mapping:', files);
  
  for (const file of files) {
    // Try to match either just a number or a number followed by extension
    const match = file.name?.match(/^(\d+)(?:\.|$)/);
    if (match && file.id) {
      const index = match[1];
      const imageUrl = getImageUrl(file.id);
      console.log(`Mapping image: index=${index}, file=${file.name}, url=${imageUrl}`);
      map.set(index, imageUrl);
    } else {
      console.log(`Skipping file - no valid index pattern: ${file.name}`);
    }
  }
  return map;
};

const getFirstTxtFileContent = async (
  drive: drive_v3.Drive,
  files: drive_v3.Schema$File[],
  label: string
): Promise<string> => {
  const txtFile = files.find((file) => file.name?.endsWith('.txt'));
  if (!txtFile || !txtFile.id) {
    throw new Error(`No .txt file found in the "${label}" folder.`);
  }
  return await getFileContent(drive, txtFile.id);
};

type Person = {
  name: string;
  achievement: string;
  image: string | null;
};

type ApiResponse = {
  achievements: Person[];
  members: Person[];
  mentors: Person[];
  events: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);

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

    console.log('Member text file content:', memberText);

    const [aData, memberData, mentorData] = [
      parseTextData(aText),
      parseTextData(memberText),
      parseTextData(mentorText),
    ];

    console.log('Parsed member data:', memberData);
    console.log('Member image files:', memberImageFiles);

    const [aImageMap, memberImageMap, mentorImageMap] = [
      mapImages(aImageFiles),
      mapImages(memberImageFiles),
      mapImages(mentorImageFiles),
    ];

    console.log('Member image map:', Array.from(memberImageMap.entries()));

    const members = memberData.map(({ index, name, achievement }) => {
      const image = memberImageMap.get(index);
      console.log(`Processing member ${name} with index ${index}, found image: ${image}`);
      return {
        name,
        achievement,
        image: image || null,
      };
    });

    const achievements = aData.map(({ index, name, achievement }) => {
      const image = aImageMap.get(index);
      return {
        name,
        achievement,
        image: image || null,
      };
    });

    const mentors = mentorData.map(({ index, name, achievement }) => {
      const image = mentorImageMap.get(index);
      return {
        name,
        achievement,
        image: image || null,
      };
    });

    const events = eventImageFiles
      .map((file) => file.id ? getImageUrl(file.id) : null)
      .filter((url): url is string => url !== null);

    res.status(200).json({ achievements, members, mentors, events });
  } catch (err: any) {
    console.error('Google Drive fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}

