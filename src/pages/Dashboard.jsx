import React, { useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { collection, getDocs, query, where, doc, updateDoc, getDoc } from 'firebase/firestore';
import { parse } from 'postcss';
function Dashboard() {
  const [courses, setCourses] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyDKV9KgIQtaVdCyxoCVs_7IJI35if3nK68",
    authDomain: "alemeno-ab92d.firebaseapp.com",
    projectId: "alemeno-ab92d",
    storageBucket: "alemeno-ab92d.appspot.com",
    messagingSenderId: "329500179887",
    appId: "1:329500179887:web:018c5bb8a5c170d1c7835a",
    measurementId: "G-CPGPC55JVG"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }



  const fetchProductDetails = async () => {
    try {
        const db = firebase.firestore();
        const q = query(collection(db, 'courses'), where('status', '==','show'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const coursesData = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                coursesData.push({ id: doc.id, ...data });
            });
            setCourses(coursesData);
        } else {
            console.log('No matching products found.');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};
const handleCheckboxChange = async (id) => {
  try {
    const db = firebase.firestore();
    const coursesQuery = query(collection(db, 'courses'), where("id", '==', parseInt(id)));

    const querySnapshot = await getDocs(coursesQuery);
    const courseDoc = querySnapshot.docs[0]; // Assuming only one matching doc

    if (courseDoc) {
      await updateDoc(courseDoc.ref, { markAsCompleted:true , progress: 1 });
    } else {
      // Handle case where document doesn't exist
    }
  } catch (error) {
    console.error('Error updating course:', error);
  }
};


  useEffect(()=>{
    
    fetchProductDetails();
  }, [])

 

  return (
    <section className='flex flex-col items-center'>
    <div className='w-[80%] flex flex-row justify-between mt-[32px] '>
      <div>
        <p className='font-bold text-[40px] '>Welcome User!</p>
        <p className='font-bold text-[40px] '>Find Your enrolled courses here...</p>
      </div>
      
      <img src="https://cdn.iconscout.com/icon/free/png-256/free-user-1648810-1401302.png?f=webp" className='rounded-[50%]' alt=""/>
    </div>
    <div>
    <ul className="flex flex-wrap flex-row self-center items-center justify-evenly ">
    {courses.map((profile) => (
        <article key={profile.id} className="border-[white] gap-[8px] bg-slate-300 items-center lg:m-[50px] my-[20px] p-[30px] border rounded-2xl flex flex-col">
            <img src={profile.thumbnail} className="h-[200px] w-[250px]" alt="User Icon" />
            <span>Name: <b>{profile.name}</b></span>
            <span>Instructor: <b>{profile.instructor}</b></span>
            <span >Progress: <progress className=' pt-[5px]' value={profile.progress}></progress></span>
            <label>
            <input 
              type="checkbox" 
              checked={profile.markAsCompleted}
               
              onChange={() => handleCheckboxChange(profile.id, profile.markAsCompleted)} 
            />
            Mark as Completed
          </label>

        </article>
    ))}
</ul>
    </div>
    </section>
  )
}

export default Dashboard
