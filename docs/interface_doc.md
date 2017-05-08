### **index.js**
---

#### **myChart1 客流、入店量、入店率**
1. Request URL: /graph/passengerflow
2. Request Method: GET
3. Data Type: JSON
4.  ```
		{
		 time: {"day":['5/1','5/2','5/3'……,'5/7'],
		 	    "week":[],
				"month":[]
			   },
		 value: {"passengerFlow":[[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3](日),[](周),[](月)],
		 		 "enterFlow":[],
				 "enteringRate":[]
		 		}			   
		}
	```
5.  Description： 
 			1. time: `折线图X轴数据，代码重用`
 			2. value: `客流量数据、入店量数据、入店率数据`


#### **myChart2 新老顾客饼图**
1. Request URL: /graph/findnewoldcustomer
2. Request Method: GET
3. Data Type: JSON
4. `
    {
     newCustomer:243,
     oldCustomer:333
    }
   `
5. Description:
			1. newCustomer: `新顾客数量`
			2. oldCustomer: `老顾客数量`


#### **myChart3 顾客活跃度**
1. Request URL: /graph/clientactivitydegree
2. Request Method: GET
3. Data Type: JSON
4. ```
    

   ```