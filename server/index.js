import express from "express";
import pg from "pg";
import cors from 'cors';
import dotenv from 'dotenv';




const app=express();
const port=3000;

const db=new pg.Client({
    user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})
db.connect();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors()); 
app.post("/todo",async(req,res)=>{
    try{
      const {description}=req.body;
      const result=await db.query("INSERT INTO todo (description) VALUES($1) RETURNING * ",[description]);
      res.json(result.rows[0]);
    }
    catch(err){
        console.log(err);
    }
});

app.get("/todo",async(req,res)=>{
    try{
        const result=await db.query("SELECT * FROM todo");
        res.json(result.rows);

    }catch(err){
        console.log(err);

    }
    
});

app.get("/todo/:id",async(req,res)=>{
     try {
        const {id}=req.params;
        const result=await db.query("SELECT * FROM todo WHERE id=$1",[id]);
        res.json(result.rows[0]);

        
     } catch (error) {
        console.log(error);
        
     }
});


app.put("/todo/:id",async(req,res)=>{
    try {
        const{id}=req.params;
        const{description}=req.body;
        const result=await db.query("UPDATE todo SET description =$2 WHERE id=$1  RETURNING *",[id,description]);
        res.json(result.rows[0]);
        
    } catch (error) {
        console.log(error);
        
    }
});


app.delete("/todo/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        await db.query("DELETE FROM todo WHERE id=$1",[id]);
        res.json("Todo was deleted !");
        
    } catch (error) {
        console.log(error);
        
    }

})

app.listen(port,()=>{
    console.log(`successfully running on ${port}`);
})