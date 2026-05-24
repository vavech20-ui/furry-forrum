import { api } from './client';

function asList(data) {
  return Array.isArray(data) ? data : data.results ?? [];
}

export async function fetchBoards() {
  const { data } = await api.get('/boards/');
  return asList(data);
}

export async function createBoard({ slug, name, description }) {
  const { data } = await api.post('/boards/', { slug, name, description });
  return data;
}

export async function fetchThreads() {
  const { data } = await api.get('/boards/threads/');
  return asList(data);
}

export async function fetchThread(id) {
  const { data } = await api.get(`/boards/threads/${id}/`);
  return data;
}

export async function createThread(formData) {
  const { data } = await api.post('/boards/threads/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deleteThread(id) {
  await api.delete(`/boards/threads/${id}/`);
}

export async function fetchPosts() {
  const { data } = await api.get('/boards/posts/');
  return asList(data);
}

export async function createPost(formData) {
  const { data } = await api.post('/boards/posts/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function deletePost(id) {
  await api.delete(`/boards/posts/${id}/`);
}
