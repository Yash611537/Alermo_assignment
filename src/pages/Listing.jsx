import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import searchIcon from '/search.png';
import like from "/like.png"
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/firestore';
function Listing() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const firebaseConfig = {
        apiKey: "AIzaSyDKV9KgIQtaVdCyxoCVs_7IJI35if3nK68",
        authDomain: "alemeno-ab92d.firebaseapp.com",
        projectId: "alemeno-ab92d",
        storageBucket: "alemeno-ab92d.appspot.com",
        messagingSenderId: "329500179887",
        appId: "1:329500179887:web:018c5bb8a5c170d1c7835a",
        measurementId: "G-CPGPC55JVG"
      };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const fetchData = async () => {
      try {
        const profileCollection = collection(db, 'courses');
        let q;

        if (searchQuery.trim() === '') {
          q = query(profileCollection);
        } else {
          q = query(
            profileCollection,
            where('name', '>=', searchQuery),
            where('name', '<=', searchQuery + '\uf8ff')
          );
        }

        const snapshot = await getDocs(q);
        const profilesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setCourses(profilesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const sendDits = (id) => {
    navigate(`/course/${id}`, { state: { id } });
  };


  const handleCheckboxChange = async (id, like) => {
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyDKV9KgIQtaVdCyxoCVs_7IJI35if3nK68",
            authDomain: "alemeno-ab92d.firebaseapp.com",
            projectId: "alemeno-ab92d",
            storageBucket: "alemeno-ab92d.appspot.com",
            messagingSenderId: "329500179887",
            appId: "1:329500179887:web:018c5bb8a5c170d1c7835a",
            measurementId: "G-CPGPC55JVG"
          };
    
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);   
      const coursesQuery = query(collection(db, 'courses'), where("id", '==', parseInt(id)));
  
      const querySnapshot = await getDocs(coursesQuery);
      const courseDoc = querySnapshot.docs[0]; // Assuming only one matching doc
     
      if (courseDoc) {

        await updateDoc(courseDoc.ref, { likes:like+ 1 });

        // Update the local state to reflect the change
        const updatedCourses = courses.map(course => {
          if (course.id === id) {
            return { ...course, likes: course.likes + 1 };
          } else {
            return course;
          }
        });

        setCourses(updatedCourses);
      } else {
        // Handle case where document doesn't exist
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  
  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-[30px] text-center mt-[30px]'>List Of ALL Courses</h1>
      <div className='relative w-[80%] h-[40px] mt-[12px] flex items-center px-[20px]  border-[1px]  border-gray-500'>
        <input
          type="text"
          placeholder='Search by course name'
          className='w-[100%]  h-[30px]  text-[black]'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img src={searchIcon} className='h-[30px] w-[30px] right-0 top-1 mr-[15px] absolute' alt="Search Icon" />
      </div>
      <ul className="flex flex-wrap self-center items-center justify-evenly w-[80%]">
        {courses.map((profile) => (
          <article onClick={() => sendDits(profile.id)} key={profile.id} className="border-[white] cursor-pointer gap-[8px] bg-slate-300 items-center lg:m-[50px] my-[20px] p-[30px] border rounded-2xl flex flex-col">
            <img src={profile.thumbnail} className="h-[200px] w-[250px]" alt="User Icon" />
            <span>Name: <b>{profile.name}</b></span>
            <span>Instructor: <b>{profile.instructor}</b></span>
            <span>Location: <b>{profile.location}</b></span>
            <div className='flex flex-row gap-4 mt-[8px]'>
              <img
                src={like}
                className='w-[25px] h-[25px] cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(profile.id, profile.likes);
                }}
              />
              <p>{profile.likes}</p>
            </div>
          </article>
        ))}
      </ul>
    </div>
  );
}

export default Listing;
