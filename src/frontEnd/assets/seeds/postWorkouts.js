import axios from "axios";

for(let i=0; i<20; i++){
    axios.post("/api/workouts", {
        day: Date.now(),
        duration: `${Math.floor(Math.random()*24)}:${Math.floor(Math.random()*60)}`,
        izometricExercises: [{
            name: "plank",
            sets: [{
                weight: 2,
                holdsTime: [5,5,5]
            },{
                weight: 0,
                holdsTime: [5,5,5]
            },{
                weight: 6,
                holdsTime: [5,5,5,4,6]
            },{
                weight: 0,
                holdsTime: [5]
            }]
        }],
        standardExercises: [{
            name: "pull up",
            sets: [{
                weight: 2,
                repetitions: 6
            },{
                weight: 0,
                holdsTime: 7
            },{
                weight: 6,
                holdsTime: 8
            },{
                weight: 0,
                holdsTime: 9
            }]
        }]
    })
}