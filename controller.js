jQuery(function($){

	var map = new BMap.Map("allmap");            // 创建Map实例

	var myGeo = new BMap.Geocoder();    
	myGeo.getPoint("玄妙观", function(point){    
		if (point) {    
			map.centerAndZoom(point, 16);
			$("button.findout").removeAttr("disabled") ;
		}
	}, "苏州市");
	
	// 点击地图设置经纬数值
	map.addEventListener("click", function(e){
		$("#lng").val(e.point.lng) ;
		$("#lat").val(e.point.lat) ;
	});
	

	$("button.findout").click(function(){
			
		var lng = parseFloat($("#lng").val()) ; // 经度
		var lat = parseFloat($("#lat").val()) ;	// 纬度
		var point = new BMap.Point(lng,lat) ;
		console.log(point) ;
		
		var nearest = null ;

		var local = new BMap.LocalSearch("苏州市", {    
			renderOptions: {    
				map: map,    
				autoViewport: true,    
				selectFirstResult: false    
			}
			, pageCapacity: 8
		});   
		
		local.setMarkersSetCallback(function(pois){			
			
			var minDis = 0 ;
			console.log(pois.length)
			
			for(var i=0;i<pois.length;i++)
			{					
				var dis = map.getDistance(point,pois[i].point) ;
				if(dis<minDis || minDis==0)
				{
					minDis = dis ;
					nearest = pois[i] ;
				}
					
				console.log(point,pois[i].point,dis);
			}
			
			if(nearest)
			{
				$("#output").html(
					nearest.title
					+ "<br />直线距离："+Math.round(minDis)+"米"
					+ "<br />地址："+nearest.address
					+ "<br />电话："+nearest.phoneNumber
				) ;
			}
			
		}) ;


		local.searchNearby("肯德基",point);
	}) ;

}) ;
