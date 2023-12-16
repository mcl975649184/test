import pkg from "express";
import cors from "cors"
import {treeData,filterDataByCode} from "./config.js"
const server=pkg()
server.use(cors())
server.get("/api/policyholders",(req,res)=>{
  const code=req.query.code*1
  const result = filterDataByCode(treeData, code);
  res.send(result)
})


server.listen(3000,()=>{
  console.log("服务器开启成功");
})