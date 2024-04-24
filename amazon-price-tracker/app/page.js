"use client"
import React from "react";
import Image from "next/image";
import Navbar from "@/public/components/Navbar";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'amazon2';

  await client.connect();
  
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('prices');
  const findResult = await collection.find({}).toArray();
  console.log(findResult);
  

  export default  function Home() {

  return (
   <>
   <Navbar />
   <div className="container mx-auto text-center py-5">
        <h1 className="textclass">Welcome to Amazon Price Tracker</h1>
      </div>
      </>
  );
  }
  

