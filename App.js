import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import {
  LineChart

} from "react-native-chart-kit";
export default function App() {

 const  webSocket=new WebSocket('wss://ws-feed.gdax.com/')

const [data,setData]=useState([])

const [price,setPrice]=useState([])
const [time,setTime]=useState([])

 const subscribe={
   type:"subscribe",
   channels:[{
     name:"ticker",
     product_ids:["BTC-USD"]
   }
   ]
 }

useEffect(()=>{
  if(open){
    webSocket.onopen=function(event){
      webSocket.send(JSON.stringify(subscribe))
    }
  }
},[])









 


 
  
   webSocket.onmessage=function(event){
   
      let k=JSON.parse(event.data)
      if(k.type=='ticker'){
       let r=[...data] 
      
       data.push(k) 
       setData(r)
       console.log(data)

      if(data.length>9)
      data.shift();
     
    return ()=> webSocket.close()
      }
           }


         

 



  
 
       if(data.length>0){
 data.map((item,i)=>{
  
  
  let t=new Date(item.time).getHours() + ":"+
  new Date(item.time).getMinutes() + ":"+
  new Date(item.time).getSeconds()+"s"

  time.push(t)
  if(time.length>9)
  time.shift();
 })

       }

       if(data.length>0){
        data.map((item,i)=>{
         
       
         let t=parseFloat(item.price)
        price.push(t)
        if(price.length>9)
        price.shift();
        })
       
              }
 console.log(price)
  
  

   
  return (
    <View style={styles.container}>
      {data.length>0?<LineChart
    data={{
      labels: time,
      datasets: [
        {
          data: price
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#f5f5f5",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 0
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />:<Text>Loading Please wait</Text>}
 


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
