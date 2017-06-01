### **index.js**
---

#### **myChart1 客流、入店量、入店率**
1. Request URL: `/graph/passengerflow.do`
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
	  "month": {"date":[1,2,3,4,5,6,7,8,9,10,11,12],
			   "passengerFlow":[2.0, 4.9,......,3.2],
			   "enterFlow":[2.0, 4.9,......,3.2],
			   "enteringRate":[2.0, 4.9,......,3.2]
			}
	 }
	```
5. Description： 
 			1. time: `折线图X轴数据`
 			2. value: `客流量数据(日、周、月)、入店量数据、入店率数据`
6. Data From To: Server to Client

#### **myChart2 新老顾客**
1. Request URL: `/graph/findnewoldcustomer.do`
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
6. Data From To: Server to Client


#### **myChart3 顾客活跃度**
1. Request URL: `/graph/activitydegree.do`
2. Request Method: `GET`
3. Data Type: `JSON`
4. 
```json	
	{
	  "week": {"date":["5/8","5/1"],
	           "highDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			},
	  "month": {"date":[1,2,3,4,5,6,7,8,9,10,11,12],
	  		   "highDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			}
	 }
```
5. Description:
			1. time: `堆叠柱状图X轴数据`
			2. value: `高活跃度（日、周、月）、中活跃度、低活跃度、沉睡活跃度`
6. Data From To: Server to Client

			
#### **myChart4 深访率、跳出率**
1. Request URL: `/graph/deepoutdegree.do`
2. Request Method: `GET`
3. Data Type: `JSON`
4. 
```json
	{
	  "day": {"date":["5/7","5/6","5/5","5/4","5/3","5/2","5/1"],
			  "deepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			  "outDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			 },
	  "week": {"date":["5/7","5/6","5/5","5/4","5/3","5/2","5/1"],
			   "deepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "outDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			},
	  "month": {"date":[12,11,10,9,8,7,6,5,4,3,2,1],
			   "deepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "outDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			}
	 }
```
5. Description:
			1. time: `堆叠柱状图X轴数据`
			2. value: `高活跃度（日、周、月）、中活跃度、低活跃度、沉睡活跃度`
6. Data From To: Server to Client			
			


---


---


### **passengerFlow.js**
---
#### **实时客流**
1. Request URL: `/graph/realTimePassengerflow.do`
2. Request Method: `GET`
3. Data Type: `JSON`
4.  
```json
		{
		 value: ["12:05:25", 120]   
		}
```
5. Description： 
 			1.value[0]: `横轴数据`
			2.value[1]: `纵轴数据`
6. Data From To: Server to Client



---


---

### **passengerTransform.js**
---
#### 客流转化
1. Request URL: `/graph/passengerTransform.do`
2. Request Method: `GET`
3. Data Type: `JSON`
4. ```json
{"1月":{
		 "nodes": [
			{
			  "name": "忠诚顾客"
			},
			{
			  "name": "活跃顾客"
			},
			{
			  "name": "不活跃顾客"
			},
			{
			  "name": "流失顾客"
			},
			{
			  "name": "回流顾客"
			}
	   ]
	 "links": [
		{
		  "source": "Agricultural 'waste'",
		  "target": "Bio-conversion",
		  "value": 124.729
		},
		{
		  "source": "Bio-conversion",
		  "target": "Liquid",
		  "value": 0.597
		}
		]		   
	},
	"2月":{
		 "nodes": [
			{
			  "name": "忠诚顾客"
			},
			{
			  "name": "活跃顾客"
			},
			{
			  "name": "不活跃顾客"
			},
			{
			  "name": "流失顾客"
			},
			{
			  "name": "回流顾客"
			}
	   ]
	 "links": [
		{
		  "source": "流失顾客",
		  "target": "回流顾客",
		  "value": 12
		},
		{
		  "source": "活跃顾客",
		  "target": "不活跃顾客",
		  "value": 20
		}
		]		   
	}
	
	
}
```
5. Description： 
 			1. nodes: `指标名称`
 			2. links: `指标与指标之间的关系`
					1. source: `源`
					2. target: `终点`
					3. value: `源与终点关系的数值`
6. Data From To: Server To Client



---


---
### **wifiSetting.js**
---
#### **探针绑定**
1. Request URL: `/config/wifisetting.do`
2. Request Method: `POST`
3. ```json
	{
		wifiProbeID: "12",
		wifiProbePassword: "123456",
		wifiProbeAddress: "贝克街221号"
	} 
   ```
4. Data Type: `JSON`
5. Description：
	1. wifiProbeID: `wifi探针的id`
	2. wifiProbePassword: `wifi探针的密码，验证成功才可以绑定`
	3. wifiProbeAddress: `wifi探针的部署地址`
6. Data From To: Client To Server


#### **请求探针信息**
1. Request URL:  `/config/wifiprobeinfo.do`
2. Request Method: `POST`
3. 
```json
	{
		result:[
			{
				id: 024,
				address: "贝克街221号",
				status: "on"
			},
			{
				id: 026,
				address: "贝克街211号",
				status: "off"
			}
	    ]
	} 
	
   ```
4. Data Type: `JSON`
5. Description：
	1. id: `探针id`
	2. address: `探针地址`
	3. status: `探针状态`
6. Data From To: Server To Client


#### ** 修改探针状态 **
1. Request URL:  `/config/setwifistatus.do`
2. Request Method: `POST`
3. ```json
	{
		id:"024",
		status:"off"
	}
   ```
4. Data Type: `JSON`
5. Description：
	1. id: `探针id`
	2. status: `探针状态`
6. Data From To: Client To Server


---


---
### **thresholdSetting.js**
---
#### **设置顾客活跃度阈值**
1. Request URL: `/config/thresholdhmls.do`
2. Request Method: `POST`
3. ```json
	{
		h_m: 5,
		m_l: 3,
		l_s: 2
	} 
   ```
4. Data Type: `JSON`
5. Description:
	1. h_m: `高、中活跃度阈值`
	2. m_l: `中低活跃度阈值`
	3. l_s: `wifi探针的部署地址`
6. Data From To: Client To Server
7. Server Response:
```json
{
	"result": "true"
}
```


#### **设置深访跳出率阈值**
1. Request URL: `/config/thresholddj.do`
2. Request Method: `POST`
3. ```json
	{
		deep:5500,
		jump:3600
	} 
   ```
4. Data Type: `JSON`
5. Description:
	1. deep: `深访率阈值`
	2. jump: `跳出率阈值`
6. Data From To: Client To Server



#### **请求阈值数据**
1. Request URL: `/data/getthreshold.do`
2. Request Method: `GET`
3. 
```json
	{
		activity:{
			h_m:15,
			m_l:11,
			l_s:5
		},
		deepjump:{
			deep:3600,
			jump:1800
		}
	} 
```
4. Data Type: `JSON`
5. Description:

	1. hmls: `顾客活跃度阈值数据`
		1. h_m: `高 中`
		2. m_l: `中 低`
		3. l_s: `低 睡眠`
	2. dj: `深访跳出率阈值`
		1.	deep: `深访`
		2.	jump: `跳出`
6. Data From To: Server To Client