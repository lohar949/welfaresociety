import { google, drive_v3 } from 'googleapis';
import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

const credentials = {
  "type": "service_account",
  "project_id": "nodal-cogency-459823-k2",
  "private_key_id": "630d868a84028f8cc8b135c60f49a34eb62a067b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDiIl+oYe/JB4m1\nfeWMRdbnzA/SfAJY9Z2EI82TNigskohYum/spbHJhdLuMGbUcYzIurfeuym8qnHc\nhqFKXQCJsRgG+8Bny4dl8itsq638ICGhrkvNQchOp2ntM5chSBkxliBb4ydNb0OA\nR41fCKu/LaZNPB16cIcfKv+kokgOLpo99beY+3cjlnQ0doKpdO2p01H0oI8VWpuX\nSNlaTDBJT6/NvmWatXsnKk37u1E3RgmtZClIolTjl+s15DTYrNR+n+6Km4Fz+mLr\nCpk0B5j4BRgOqImY+DYJPs1YQHe4pcY1K30zl5fPrpW9mjdaZ6/os0X8Xj7P/8kG\nai0Gzy+lAgMBAAECggEABv2zqGB/icVmYzDrtlNe0MnujH4FLCixWg/DTMBMkkHL\nd+n3onP/umO22pWusCji7Qrv7hf2/9xJhEOGdZnJD18YVF4j6IssLSFez0+PCiLl\nXa3zFC4eJueNFX/vtazL2DK0eGX3spcOGeEPnh1saQ72IiAjWl3KB6AlyO2ApC0k\nxz5j4nBiAJxJRSeJyPMXr6ohWB3NwBkk+ZGfI7yRrFye1EJIHYKfvr+cJggCQDRi\nEExwGT0cT8pgd/LyJMymNNRrE2VYJmEP3Z4FV+sv/+Xi6KqbO4mwm4WQpgegVTaP\nodi6KAPOdzrsvPha73iG+KWEPnC59E/k+XzWbqehtwKBgQD0V+TGRcPFtilaHxXo\nR3fwpnWyj9AIKraZ3+RMT7hD8hBXJ+shK+R1zZeEc1GmQmv63KPkzD+rvtqgrVnT\nbREjDcGuxe7waV3T+v3osz33Q3Jx58pwowNSf4VRd9M03xExRor1cAIEYNEjUv+s\nayLUmmWVu/DHCAf/Z5TzKXHRowKBgQDs7Bjcf6wILlPvaNtCfpWXN6xJqJ8DozPP\ncIkXMuuveTyXzPesHhxu0ZMg9m6cQpdi6sQ8PPS6l6t7FjqXOkGd3ytpOOblp+RV\nL2qWAJNCrbN8oE08b0A2sC05q1mRVZHL2yLfr7oBYRGVWmgDonPD+N3LCyYrK2mo\nKjjQP67eFwKBgQCAoJRqW+eHeTGjo6GguZ7GLJrg+RwGcJXXwyknkv/ppNA9UWJS\nAA0whp4wt5RP9b9qPCR7GZqbCsmEtD0JM+1FisRfAQubu5wNL5/ilBkWxYbFt8O2\nL9pb342LKY0h1Bv02LHmKqSlMWJnOhYl6fBYAz9e56UE4ZF0Pk8HAtZMCQKBgEka\nuLkg8/Y6RU/0LOOhp4rXdOPtkdNPgmcZtFNiNPMaF6ZHaozDZcaUCC/9mjfBHHE7\nO33S2TjSH+mE/GM5aJHMENsQ4b4vRfc7AEp0tvu2GVH1LJ/fPBMj3XCT/LkpjCk4\n3tPipyRRzVkmYj3s3Ie1vMowEID1jk6DaLBpVg3VAoGBALb3iyybi5/TloQuytod\nbJb/rfe19/SsZkL2XGIgZvACksXW4zfAfs3KD/HfI6WqHL1w8IhoO+ixPNb7/abw\nTh/32YrFC+KWPcUiCawdx/NDqZpMZM9cVyW8Q74MGPfNVRymT81YRn80cPT7/2y4\nWlt5RC7gLZbV3N6X87zv7Gk0\n-----END PRIVATE KEY-----\n",
  "client_email": "donation@nodal-cogency-459823-k2.iam.gserviceaccount.com",
  "client_id": "115847446656465668557",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/donation%40nodal-cogency-459823-k2.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

const getDriveClient = (): drive_v3.Drive => {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  return google.drive({ version: 'v3', auth });
};

const getImageUrl = (fileId: string): string => {
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
      map.set(match[1], getImageUrl(file.id));
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
  // Run the middleware
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

    const events = eventImageFiles.map(file => file.id ? getImageUrl(file.id) : '');

    res.status(200).json({ achievements, members, mentors, events });
  } catch (err: any) {
    console.error('Google Drive fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}
