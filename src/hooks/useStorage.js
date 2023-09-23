import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { projectStorage, projectFirestore } from '../firebase/config'; 

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(projectStorage, file.name);
    const collectionRef = collection(projectFirestore, 'images');
    
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
      console.error("Upload error: ", err);
    }, async () => {
      const downloadUrl = await getDownloadURL(storageRef);
      const createdAt = serverTimestamp();
      await addDoc(collectionRef, { url: downloadUrl, createdAt });
      setUrl(downloadUrl);
    });
  }, [file]);

  return { progress, url, error };
}

export default useStorage;
