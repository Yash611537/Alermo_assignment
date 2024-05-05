import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import the Firestore module
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
function Course() {
    const [courses, setCourses] = useState({});
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


    const [syllabus, setsyllabus] = useState([]);
    const [test, setTest] = useState(false);
    
    const { id } = useParams();
    const fetchProductDetails = async (smallTitle) => {
        try {
          if (smallTitle) {
            const db = firebase.firestore();
            const q = query(collection(db, 'courses'), where('id', '==', smallTitle));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                // Do something with the data, such as storing it in state or displaying it
       
                setCourses(data)
              });
            } else {
              console.log('No matching product found.');
            }
          } else {
            console.log('Product title is empty.');
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      useEffect(()=>{
        
        fetchProductDetails(parseInt(id));
      }, [id])


       // Initialize Firebase app
       const app = initializeApp(firebaseConfig);

       // Initialize Firestore
       const db = getFirestore(app);
   
       // Fetch data from Firestore
const fetchData = async () => {
  try {
    const profileCollection = collection(db, 'syllabus');
    const q = query(profileCollection, where("courseId", "==", parseInt(id)));
    const snapshot = await getDocs(q);

    let profilesData = snapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data() // Document data
    }));

    // Sort the profilesData array by the id in ascending order
    profilesData.sort((a, b) => a.id - b.id);
    
    setsyllabus(profilesData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
fetchData()
      
      
  return (
    <section className='flex flex-col'>
        <img src={courses.thumbnail} alt="" className='lg:h-[400px] mt-[32px] lg:w-[30%] w-[90%] self-center'/>
        <h1 className='lg:text-[38px] text-[24px] font-bold text-center mt-[16px] mb-[8px]'>{courses.name}<p className='text-[20px] font-bold text-center '>-{courses.instructor}</p></h1>
        <p className="text-[18px] text-center w-[95%]">Description: <b>{courses.desc}</b></p>
        <p className="text-[18px] text-center mt-[18px]">Enrollment Status: <b>{courses.enrolStatus}</b></p>
        <p className="text-[18px] text-center mt-[18px]">location- <b>{courses.location}</b></p>
        <p className="text-[18px] text-center mt-[18px]">Duration- <b>{courses.duration}</b></p>
        <p className="text-[18px] text-center mt-[18px] w-[95%]">Schedule- <b>{courses.schedule}</b></p>
        <p className="text-[18px] text-center mt-[18px] w-[95%]"  >Pre-Requisites: <b>{courses.prereq}</b></p>
        <div className={`flex flex-col self-center mt-[30px]  w-[95%] lg:w-auto `} >
            <div onClick={()=>setTest(!test)} className='flex text-[26px] font-black flex-row cursor-pointer lg:w-[700px]  justify-between'>
                <p>Syllabus</p>
                <p>+</p>
            </div>
            <div className={`${test? `flex flex-col`:`hidden`}`}>
                {syllabus.map((profile) => (
                    <article  key={profile.id} className="border-[white] gap-[8px] bg-slate-300 items-center lg:m-[50px] my-[20px] p-[30px] border rounded-2xl flex flex-col">
                        <span>Week: <b>{profile.week}</b></span>
                        <span>Topic: <b>{profile.topic}</b></span>
                        <span>Content: <b>{profile.content}</b></span>
                    </article>
                ))}
            </div>            
        </div>
    </section>
  )
}

export default Course
