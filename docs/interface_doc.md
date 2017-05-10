### **index.js**
---

#### **myChart1 客流、入店量、入店率**
1. Request URL: `/graph/passengerflow`
2. Request Method: `GET`
3. Data Type: `JSON`
4.  ```json
	{
	  "day": {"date":["5/1","5/2","5/3",……,"5/7"],
				"passengerFlow":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "enterFlow":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "enteringRate":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			 },
	  "week": {"date":["5/8","5/1"],
			   "passengerFlow":[2.0, 4.9],
			   "enterFlow":[2.0, 4.9],
			   "enteringRate":[2.0, 4.9]
			},
	  "month" {"date":[1,2,3,4,5,6,7,8,9,10,11,12],
			   "passengerFlow":[2.0, 4.9,......,3.2],
			   "enterFlow":[2.0, 4.9,......,3.2],
			   "enteringRate":[2.0, 4.9,......,3.2]
			}
	 }
	```
5. Description： 
 			1. time: `折线图X轴数据，代码重用`
 			2. value: `客流量数据(日、周、月)、入店量数据、入店率数据`


#### **myChart2 新老顾客**
1. Request URL: `/graph/findnewoldcustomer`
2. Request Method: `GET`
3. Data Type: `JSON`
4. ```
    {
     newCustomer:243,
     oldCustomer:333
    }
   ```
5. Description:
			1. newCustomer: `新顾客数量`
			2. oldCustomer: `老顾客数量`


#### **myChart3 顾客活跃度**
1. Request URL: `/graph/activitydegree`
2. Request Method: `GET`
3. Data Type: `JSON`
4. ```json	
	{
	  "day": {"date":["5/1","5/2","5/3",……,"5/7"],
				"middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			 },
	  "week": {"date":["5/8","5/1"],
			   "middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			},
	  "month" {"date":[1,2,3,4,5,6,7,8,9,10,11,12],
			   "middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
				 "sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			}
	 }
   ```
5. Description:
			1. time: `堆叠柱状图X轴数据，代码重用`
			2. value: `高活跃度（日、周、月）、中活跃度、低活跃度、沉睡活跃度`
			
			
#### **myChart4 深访率、跳出率**
1. Request URL: `/graph/deepoutdegree`
2. Request Method: `GET`
3. Data Type: `JSON`
4. ```json
	{
	  "day": {"date":["5/1","5/2","5/3",……,"5/7"],
			  "deepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			  "outDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			 },
	  "week": {"date":["5/8","5/1"],
			   "deepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "outDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			},
	  "month" {"date":[1,2,3,4,5,6,7,8,9,10,11,12],
			   "deepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "outDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			}
	 }
   ```
5. Description:
			1. time: `堆叠柱状图X轴数据，代码重用`
			2. value: `高活跃度（日、周、月）、中活跃度、低活跃度、沉睡活跃度`
			
			


---

---


### **passengerFlow.js**
---
#### **实时客流**
1. Request URL: `/graph/realTimePassengerflow`
2. Request Method: `GET`
3. Data Type: `JSON`
4.  ```json
		{
		 time: "5/8",
		 value: 153		   
		}
	```
5. Description： 
 			1. time: `时间`
 			2. value: `客流量数据`














