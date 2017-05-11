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
	  "day": { "date":["5/1","5/2","5/3",……,"5/7"],
	  		   "highDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			 },
	  "week": {"date":["5/8","5/1"],
	           "highDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
			   "sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]
			},
	  "month" {"date":[1,2,3,4,5,6,7,8,9,10,11,12],
	  		   "highDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],
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










{
  "nodes": [
    {
      "name": "Agricultural 'waste'"
    },
    {
      "name": "Bio-conversion"
    },
    {
      "name": "Liquid"
    },
    {
      "name": "Losses"
    },
    {
      "name": "Solid"
    },
    {
      "name": "Gas"
    },
    {
      "name": "Biofuel imports"
    },
    {
      "name": "Biomass imports"
    },
    {
      "name": "Coal imports"
    },
    {
      "name": "Coal"
    },
    {
      "name": "Coal reserves"
    },
    {
      "name": "District heating"
    },
    {
      "name": "Industry"
    },
    {
      "name": "Heating and cooling - commercial"
    },
    {
      "name": "Heating and cooling - homes"
    },
    {
      "name": "Electricity grid"
    },
    {
      "name": "Over generation / exports"
    },
    {
      "name": "H2 conversion"
    },
    {
      "name": "Road transport"
    },
    {
      "name": "Agriculture"
    },
    {
      "name": "Rail transport"
    },
    {
      "name": "Lighting & appliances - commercial"
    },
    {
      "name": "Lighting & appliances - homes"
    },
    {
      "name": "Gas imports"
    },
    {
      "name": "Ngas"
    },
    {
      "name": "Gas reserves"
    },
    {
      "name": "Thermal generation"
    },
    {
      "name": "Geothermal"
    },
    {
      "name": "H2"
    },
    {
      "name": "Hydro"
    },
    {
      "name": "International shipping"
    },
    {
      "name": "Domestic aviation"
    },
    {
      "name": "International aviation"
    },
    {
      "name": "National navigation"
    },
    {
      "name": "Marine algae"
    },
    {
      "name": "Nuclear"
    },
    {
      "name": "Oil imports"
    },
    {
      "name": "Oil"
    },
    {
      "name": "Oil reserves"
    },
    {
      "name": "Other waste"
    },
    {
      "name": "Pumped heat"
    },
    {
      "name": "Solar PV"
    },
    {
      "name": "Solar Thermal"
    },
    {
      "name": "Solar"
    },
    {
      "name": "Tidal"
    },
    {
      "name": "UK land based bioenergy"
    },
    {
      "name": "Wave"
    },
    {
      "name": "Wind"
    }
  ],
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
    },
    {
      "source": "Bio-conversion",
      "target": "Losses",
      "value": 26.862
    },
    {
      "source": "Bio-conversion",
      "target": "Solid",
      "value": 280.322
    },
    {
      "source": "Bio-conversion",
      "target": "Gas",
      "value": 81.144
    },
    {
      "source": "Biofuel imports",
      "target": "Liquid",
      "value": 35
    },
    {
      "source": "Biomass imports",
      "target": "Solid",
      "value": 35
    },
    {
      "source": "Coal imports",
      "target": "Coal",
      "value": 11.606
    },
    {
      "source": "Coal reserves",
      "target": "Coal",
      "value": 63.965
    },
    {
      "source": "Coal",
      "target": "Solid",
      "value": 75.571
    },
    {
      "source": "District heating",
      "target": "Industry",
      "value": 10.639
    },
    {
      "source": "District heating",
      "target": "Heating and cooling - commercial",
      "value": 22.505
    },
    {
      "source": "District heating",
      "target": "Heating and cooling - homes",
      "value": 46.184
    },
    {
      "source": "Electricity grid",
      "target": "Over generation / exports",
      "value": 104.453
    },
    {
      "source": "Electricity grid",
      "target": "Heating and cooling - homes",
      "value": 113.726
    },
    {
      "source": "Electricity grid",
      "target": "H2 conversion",
      "value": 27.14
    },
    {
      "source": "Electricity grid",
      "target": "Industry",
      "value": 342.165
    },
    {
      "source": "Electricity grid",
      "target": "Road transport",
      "value": 37.797
    },
    {
      "source": "Electricity grid",
      "target": "Agriculture",
      "value": 4.412
    },
    {
      "source": "Electricity grid",
      "target": "Heating and cooling - commercial",
      "value": 40.858
    },
    {
      "source": "Electricity grid",
      "target": "Losses",
      "value": 56.691
    },
    {
      "source": "Electricity grid",
      "target": "Rail transport",
      "value": 7.863
    },
    {
      "source": "Electricity grid",
      "target": "Lighting & appliances - commercial",
      "value": 90.008
    },
    {
      "source": "Electricity grid",
      "target": "Lighting & appliances - homes",
      "value": 93.494
    },
    {
      "source": "Gas imports",
      "target": "Ngas",
      "value": 40.719
    },
    {
      "source": "Gas reserves",
      "target": "Ngas",
      "value": 82.233
    },
    {
      "source": "Gas",
      "target": "Heating and cooling - commercial",
      "value": 0.129
    },
    {
      "source": "Gas",
      "target": "Losses",
      "value": 1.401
    },
    {
      "source": "Gas",
      "target": "Thermal generation",
      "value": 151.891
    },
    {
      "source": "Gas",
      "target": "Agriculture",
      "value": 2.096
    },
    {
      "source": "Gas",
      "target": "Industry",
      "value": 48.58
    },
    {
      "source": "Geothermal",
      "target": "Electricity grid",
      "value": 7.013
    },
    {
      "source": "H2 conversion",
      "target": "H2",
      "value": 20.897
    },
    {
      "source": "H2 conversion",
      "target": "Losses",
      "value": 6.242
    },
    {
      "source": "H2",
      "target": "Road transport",
      "value": 20.897
    },
    {
      "source": "Hydro",
      "target": "Electricity grid",
      "value": 6.995
    },
    {
      "source": "Liquid",
      "target": "Industry",
      "value": 121.066
    },
    {
      "source": "Liquid",
      "target": "International shipping",
      "value": 128.69
    },
    {
      "source": "Liquid",
      "target": "Road transport",
      "value": 135.835
    },
    {
      "source": "Liquid",
      "target": "Domestic aviation",
      "value": 14.458
    },
    {
      "source": "Liquid",
      "target": "International aviation",
      "value": 206.267
    },
    {
      "source": "Liquid",
      "target": "Agriculture",
      "value": 3.64
    },
    {
      "source": "Liquid",
      "target": "National navigation",
      "value": 33.218
    },
    {
      "source": "Liquid",
      "target": "Rail transport",
      "value": 4.413
    },
    {
      "source": "Marine algae",
      "target": "Bio-conversion",
      "value": 4.375
    },
    {
      "source": "Ngas",
      "target": "Gas",
      "value": 122.952
    },
    {
      "source": "Nuclear",
      "target": "Thermal generation",
      "value": 839.978
    },
    {
      "source": "Oil imports",
      "target": "Oil",
      "value": 504.287
    },
    {
      "source": "Oil reserves",
      "target": "Oil",
      "value": 107.703
    },
    {
      "source": "Oil",
      "target": "Liquid",
      "value": 611.99
    },
    {
      "source": "Other waste",
      "target": "Solid",
      "value": 56.587
    },
    {
      "source": "Other waste",
      "target": "Bio-conversion",
      "value": 77.81
    },
    {
      "source": "Pumped heat",
      "target": "Heating and cooling - homes",
      "value": 193.026
    },
    {
      "source": "Pumped heat",
      "target": "Heating and cooling - commercial",
      "value": 70.672
    },
    {
      "source": "Solar PV",
      "target": "Electricity grid",
      "value": 59.901
    },
    {
      "source": "Solar Thermal",
      "target": "Heating and cooling - homes",
      "value": 19.263
    },
    {
      "source": "Solar",
      "target": "Solar Thermal",
      "value": 19.263
    },
    {
      "source": "Solar",
      "target": "Solar PV",
      "value": 59.901
    },
    {
      "source": "Solid",
      "target": "Agriculture",
      "value": 0.882
    },
    {
      "source": "Solid",
      "target": "Thermal generation",
      "value": 400.12
    },
    {
      "source": "Solid",
      "target": "Industry",
      "value": 46.477
    },
    {
      "source": "Thermal generation",
      "target": "Electricity grid",
      "value": 525.531
    },
    {
      "source": "Thermal generation",
      "target": "Losses",
      "value": 787.129
    },
    {
      "source": "Thermal generation",
      "target": "District heating",
      "value": 79.329
    },
    {
      "source": "Tidal",
      "target": "Electricity grid",
      "value": 9.452
    },
    {
      "source": "UK land based bioenergy",
      "target": "Bio-conversion",
      "value": 182.01
    },
    {
      "source": "Wave",
      "target": "Electricity grid",
      "value": 19.013
    },
    {
      "source": "Wind",
      "target": "Electricity grid",
      "value": 289.366
    }
  ]
}



