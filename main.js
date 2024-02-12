import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
  
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbLsq27KJU9tD9pHC8GrPUB7LgEPEQbPU",
  authDomain: "insan-cemerlang-92ee0.firebaseapp.com",
  projectId: "insan-cemerlang-92ee0",
  storageBucket: "insan-cemerlang-92ee0.appspot.com",
  messagingSenderId: "332441427242",
  appId: "1:332441427242:web:73c31309147ef1dab15253",
  measurementId: "G-JW04DZL85R"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftarsiswa() {
  const siswaRef = collection(db, "siswa");
  const q = query(siswaRef, orderBy("nama"));
  const querySnapshot = await getDocs(q);
  
  let retval = [];
  querySnapshot.forEach((doc)=>{
    retval.push({  id: doc.id, nama: doc.data().nama });
  })
  
  
  return retval;
}
export async function tambahSiswa(val) {
 try {
  const docRef = await addDoc(collection(db,  "siswa"),{
    nama : val
  });
  console.log ('Berhasil menyimpan dokumen dengan ID' + docRef.id);
 } catch (e) {
   console.log ('Error menambah dokumen ' + e);
 }
}

export async function hapusSiwa(docid) {
  await deleteDoc(doc(db, "siswa", docid));
}

export async functio ubahSiswa(docid, val) {
  await updateDoc(doc(db, "siswa", docid), {nama: val});
}
export async function ambilSiswa(docid) {
  const docRef = await doc(db, "siswa",docid);
  const docSnap = await getDoc(docRef);
  
  return await docSnap.data();
}