import { useEffect, useState } from "react";

const Home = () => {
  //   type wkRes = { workouts: { _id: string; title: string } };
  type tmpWK = { _id: string; title: string };

  const [workouts, setWorkouts] = useState<Array<tmpWK>>();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch("/v1/workouts/");

      //   Dont like this, find a better way to unpack the array from the response object
      const data: { workouts: tmpWK[] } = await res.json();

      console.log(data.workouts);

      if (res.ok) {
        setWorkouts(data.workouts);
      }
    };
    fetchWorkouts();
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {Array.isArray(workouts) &&
          workouts?.map((workout: tmpWK) => (
            <p key={workout._id}>Title: {workout.title}</p>
          ))}
      </div>
    </div>
  );
};

export default Home;
