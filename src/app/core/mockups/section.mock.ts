import { Section, GetSectionPostsResponse } from '../models/section.model';
import { mockPosts, mockPostsMany } from './post.mock';

export const mockSections: Section[] = [
  {
    id: 1,
    name: 'Sección 1',
    subtitle:
      'Lorem enim commodo velit non. Deserunt deserunt aliqua fugiat id dolore tempor aliqua. Ut quis nulla pariatur laboris sit pariatur velit Lorem aliqua cupidatat voluptate Lorem et. Elit eiusmod aliqua voluptate officia ex minim consectetur eiusmod dolore magna. Aliquip dolor irure cillum ullamco elit laborum incididunt commodo mollit aliquip labore qui. Proident nulla dolor sint et dolore proident tempor veniam Lorem id Lorem. Aute voluptate consequat velit aliquip ex Lorem proident et pariatur.',
    createdDate: '2020-01-01T10:00:45.750Z',
    updatedDate: '2020-01-01T10:00:45.750Z',
    friendlyUrl: 'section-1',
  },
  {
    id: 2,
    name: 'Sección 2',
    subtitle:
      'Lorem enim commodo velit non. Deserunt deserunt aliqua fugiat id dolore tempor aliqua. Ut quis nulla pariatur laboris sit pariatur velit Lorem aliqua cupidatat voluptate Lorem et. Elit eiusmod aliqua voluptate officia ex minim consectetur eiusmod dolore magna. Aliquip dolor irure cillum ullamco elit laborum incididunt commodo mollit aliquip labore qui. Proident nulla dolor sint et dolore proident tempor veniam Lorem id Lorem. Aute voluptate consequat velit aliquip ex Lorem proident et pariatur.',
    createdDate: '2020-01-01T10:00:45.750Z',
    updatedDate: '2020-01-01T10:00:45.750Z',
    friendlyUrl: 'section-2',
  },
  {
    id: 3,
    name: 'Sección 3',
    subtitle:
      'Lorem enim commodo velit non. Deserunt deserunt aliqua fugiat id dolore tempor aliqua. Ut quis nulla pariatur laboris sit pariatur velit Lorem aliqua cupidatat voluptate Lorem et. Elit eiusmod aliqua voluptate officia ex minim consectetur eiusmod dolore magna. Aliquip dolor irure cillum ullamco elit laborum incididunt commodo mollit aliquip labore qui. Proident nulla dolor sint et dolore proident tempor veniam Lorem id Lorem. Aute voluptate consequat velit aliquip ex Lorem proident et pariatur.',
    createdDate: '2020-01-01T10:00:45.750Z',
    updatedDate: '2020-01-01T10:00:45.750Z',
    friendlyUrl: 'section-3',
  },
];

export const mockSectionsPosts: Section[] = [
  {
    id: 1,
    name: 'Sección 1',
    subtitle:
      'Lorem enim commodo velit non. Deserunt deserunt aliqua fugiat id dolore tempor aliqua. Ut quis nulla pariatur laboris sit pariatur velit Lorem aliqua cupidatat voluptate Lorem et. Elit eiusmod aliqua voluptate officia ex minim consectetur eiusmod dolore magna. Aliquip dolor irure cillum ullamco elit laborum incididunt commodo mollit aliquip labore qui. Proident nulla dolor sint et dolore proident tempor veniam Lorem id Lorem. Aute voluptate consequat velit aliquip ex Lorem proident et pariatur.',
    createdDate: '2020-01-01T10:00:45.750Z',
    updatedDate: '2020-01-01T10:00:45.750Z',
    friendlyUrl: 'section-1',
    posts: mockPosts,
  },
  {
    id: 2,
    name: 'Sección 2',
    subtitle:
      'Lorem enim commodo velit non. Deserunt deserunt aliqua fugiat id dolore tempor aliqua. Ut quis nulla pariatur laboris sit pariatur velit Lorem aliqua cupidatat voluptate Lorem et. Elit eiusmod aliqua voluptate officia ex minim consectetur eiusmod dolore magna. Aliquip dolor irure cillum ullamco elit laborum incididunt commodo mollit aliquip labore qui. Proident nulla dolor sint et dolore proident tempor veniam Lorem id Lorem. Aute voluptate consequat velit aliquip ex Lorem proident et pariatur.',
    createdDate: '2020-01-01T10:00:45.750Z',
    updatedDate: '2020-01-01T10:00:45.750Z',
    friendlyUrl: 'section-2',
    posts: mockPosts,
  },
  {
    id: 3,
    name: 'Sección 3',
    subtitle:
      'Lorem enim commodo velit non. Deserunt deserunt aliqua fugiat id dolore tempor aliqua. Ut quis nulla pariatur laboris sit pariatur velit Lorem aliqua cupidatat voluptate Lorem et. Elit eiusmod aliqua voluptate officia ex minim consectetur eiusmod dolore magna. Aliquip dolor irure cillum ullamco elit laborum incididunt commodo mollit aliquip labore qui. Proident nulla dolor sint et dolore proident tempor veniam Lorem id Lorem. Aute voluptate consequat velit aliquip ex Lorem proident et pariatur.',
    createdDate: '2020-01-01T10:00:45.750Z',
    updatedDate: '2020-01-01T10:00:45.750Z',
    friendlyUrl: 'section-3',
    posts: mockPosts,
  },
];

export const mockSection = mockSections[0];

// export const mockGetSectionPosts: GetSectionPostsResponse[] = [
//   {
//     posts: mockPostsMany.slice(0, 10),
//     pageCount: 3,
//   },
//   {
//     posts: mockPostsMany.slice(10, 20),
//     pageCount: 3,
//   },
//   {
//     posts: mockPostsMany.slice(20, -1),
//     pageCount: 3,
//   },
// ];
