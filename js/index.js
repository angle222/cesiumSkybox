var viewer = null
window.onload = function(){
	Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlOGRlMDVhNS1iNzQxLTQzMjctOTY1Yi1kNzY4YmYxNTIzNTAiLCJpZCI6MTQ5NTgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjY4MDg1NTR9.N08wYOzVwX4Hckt_y-jgIjyXiA8zbLqbRTE2ApfGaUE'
    viewer = new Cesium.Viewer('cesiumContainer',{
        //需要进行可视化的数据源的集合
        animation: false, //是否显示动画控件
        shouldAnimate : true,
        homeButton: false, //是否显示Home按钮
        fullscreenButton: false, //是否显示全屏按钮
        baseLayerPicker: false, //是否显示图层选择控件
        geocoder: false, //是否显示地名查找控件
        timeline: false, //是否显示时间线控件
        sceneModePicker: false, //是否显示投影方式控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: false, //是否显示点击要素之后显示的信息
        requestRenderMode: true, //启用请求渲染模式
        scene3DOnly: false, //每个几何实例将只能以3D渲染以节省GPU内存
        sceneMode: 3, //初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
        fullscreenElement: document.body, //全屏时渲染的HTML元素 暂时没发现用处
        skyAtmosphere: false,//关闭地球光环
        //天地图是官方开元的地图，不需要密钥
        // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        //     url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
        //     layer: "img",
        //     style: "default",
        //     format: "tiles",
        //     tileMatrixSetID: "w",
        //     credit: new Cesium.Credit('天地图全球影像服务'),
        //     subdomains: ['t0', "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        //     maximumLevel: 18,
        //     show: false
        // })
//      imageryProvider:new Cesium.UrlTemplateImageryProvider({
//          url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
//      }),
        // terrainProvider : new Cesium.CesiumTerrainProvider({
		//         url : Cesium.IonResource.fromAssetId(3956)
		//     })
//      imageryProvider : new Cesium.UrlTemplateImageryProvider({
//      	url :'http://139.129.98.147:8000/tms'
//  		})
    })
    viewer._cesiumWidget._creditContainer.style.display = "none";

    // viewer.camera.setView({
    //     // Cesium的坐标是以地心为原点，一向指向南美洲，一向指向亚洲，一向指向北极州
    //     // fromDegrees()方法，将经纬度和高程转换为世界坐标
    //     destination:Cesium.Cartesian3.fromDegrees(31.830035,117.159801, 409.43),
    //     orientation:{
    //         // 指向
    //         heading: 40.8,
    //             pitch: .5,
    //             roll:360
    //     }
    // });

//  viewer.camera.flyTo({
//      destination : Cesium.Cartesian3.fromDegrees(116.39132050578053,39.907051328011065, 1000.0),
//  });
    viewer.scene.camera.flyTo({
            destination: Cesium.Cartesian3.fromRadians(116.39132050578053,39.907051328011065, 500.0),
            orientation: {
                heading: -10.8,
                pitch: 0.11,
                roll:0
            }
        });
    var i = Date.now();

function rotate() {
	var a = .1;
	var t = Date.now();
	var n = (t - i) / 1e3;
	i = t;
	viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -a * n);
}

// viewer.clock.onTick.addEventListener(rotate);
// setTimeout(function() {
// 	viewer.clock.onTick.removeEventListener(rotate);
// }, 10000);
// 加载天空盒
// let scene = viewer.scene
var defaultSkyBox = viewer.scene.skyBox
var currentSkyBox = new Cesium.GroundSkyBox({
    sources : {
        positiveX: "./img/demo1/rightav9.jpg",
        negativeX: "./img/demo1/leftav9.jpg",
        positiveY: "./img/demo1/backav9.jpg",
        negativeY: "./img/demo1/frontav9.jpg",
        positiveZ: "./img/demo1/topav9.jpg",
        negativeZ: "./img/demo1/bottomav9.jpg"
    }
  });

  viewer.scene.postRender.addEventListener(()=>{
      var e = this.viewer.camera.position
      console.log('height:',Cesium.Cartographic.fromCartesian(e).height)
      if(Cesium.Cartographic.fromCartesian(e).height<2500){
        // 显示自定义的天空盒
        viewer.scene.skyBox = currentSkyBox
      }else{
        viewer.scene.skyBox = defaultSkyBox
      }
  })
//   viewer.scene.sun.show = true; 
// viewer.scene.moon.show = true;
// 指北针控件
var options = {};
        // 用于在使用重置导航重置地图视图时设置默认视图控制。接受的值是Cesium.Cartographic 和 Cesium.Rectangle.
        options.defaultResetView = Cesium.Rectangle.fromDegrees(80, 22, 130, 50);
        // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
        options.enableCompass = true;
        // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
        options.enableZoomControls = false;
        // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
        options.enableDistanceLegend = false;
        // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
        options.enableCompassOuterRing = false;

        CesiumNavigation.umd(viewer, options);


    // 添加geojson的点
    Cesium.GeoJsonDataSource.load('./code/point.geojson').then(function(dataSource) {
        viewer.dataSources.add(dataSource);
    
        var entities = dataSource.entities.values;
    
        for (var i = 0; i < entities.length; i++) {
            var entity = entities[i];
            entity.billboard = undefined;
            entity.point = new Cesium.PointGraphics({
                color: Cesium.Color.RED,
                outlineColor:Cesium.Color.BISQUE,
                outlineWidth:2,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                pixelSize: 5
            });
        }
    });
    // 添加线
      Cesium.GeoJsonDataSource.load('./code/bigline.json').then(function(dataSource) {
        // viewer.dataSources.add(dataSource);
    
        // var entities = dataSource.entities.values;
        
        // for (var o = 0; o < entities.length; o++) {
        //     var r = entities[o];
        //     r.nameID = o;   //给每条线添加一个编号，方便之后对线修改样式
        //     r.polyline.width = 10;  //添加默认样式
        //     r.polyline.material = new Cesium.PolylineGlowMaterialProperty({
        //         glowPower: .1, //一个数字属性，指定发光强度，占总线宽的百分比。
        //         color: Cesium.Color.ORANGERED.withAlpha(.9)
        //     })

        //     console.log(entities)
        // r.position.setInterpolationOptions({
        //     interpolationDegree : 5,
        //     interpolationAlgorithm : Cesium.LagrangePolynomialApproximation
        // });
        // }
        
    });
//   添加面
//    Cesium.GeoJsonDataSource.load('./code/province.json').then(function(dataSource) {
//      viewer.dataSources.add(dataSource);
//  
//      var entities = dataSource.entities.values;
//  
//      for (var o = 0; o < entities.length; o++) {
//          var entity = entities[o];
//          let color = Cesium.Color.fromRandom({
//              alpha : 1.0
//          });
//          entity.polygon.material = color;
//      }
//  });
//  viewer.dataSources.add(Cesium.GeoJsonDataSource.load('./code/poly1.json', {
//      stroke: Cesium.Color.HOTPINK,
//      fill: Cesium.Color.PINK.withAlpha(0.5),
//      strokeWidth: 3
//    }));



    // Cesium.Math.setRandomNumberSeed(0);  //设置随机数种子
    //         var promise = Cesium.GeoJsonDataSource.load('./code/poly1.json'); //geojson面数据
    //         promise.then(function(dataSource) {
    //             viewer.dataSources.add(dataSource);
    //             var entities = dataSource.entities.values;
    //             var colorHash = {};
    //             for (var i = 0; i < entities.length; i++) {
    //                 var entity = entities[i];
    //                 var name = entity.name;  //geojson里面必须得有一个name属性，entity.name对应
    //                 var color = colorHash[name]; //可以使两个同名要素使用同一种颜色。。。
    //                 if (!color) {
    //                     color = Cesium.Color.fromRandom({
    //                         alpha : 1.0
    //                     });
    //                     colorHash[name] = color;
    //                 }
    //                 entity.polygon.material = color;
    //                 entity.polygon.outline = false;
    //                 entity.polygon.extrudedHeight = Math.floor(Math.random()*40000+20000) //20000~60000的随机数，单位是米
    //                 viewer.zoomTo(promise);
    //             }
    //         })


    var czml = [{
        "id" : "document",
        "name" : "CZML Geometries: Polyline",
        "version" : "1.0"
    }, {
        "id" : "redLine",
        "name" : "Red line on the surface",
        "polyline" : {
            "positions" : {
                "cartographicDegrees" : [
                    130.166015625,45.73685954736049, 0,
          126.298828125,44.933696389694674, 0
                ]
            },
            "material" : {
                "solidColor" : {
                    "color" : {
                        "rgba" : [255, 0, 0, 255]
                    }
                }
            },
            "width" : 5
        }
    }, {
        "id" : "blueLine",
        "name" : "Glowing blue line on the surface",
        "polyline" : {
            "positions" : {
                "cartographicDegrees" : [
                    128.84765625,43.739352079154706, 0,
                    120.62988281249999,43.77109381775651, 0
                ]
            },
            "material" : {
                "polylineGlow" : {
                    "color" : {
                        "rgba" : [0, 0, 255, 255],
                        "glowPower" : 0.2
                    }
                }
            },
            "width" : 10
        }
    }, {
        "id" : "orangeLine",
        "name" : "Orange line with black outline at height and following the surface",
        "polyline" : {
            "positions" : {
                "cartographicDegrees" : [
                    121.55273437499999,46.28622391806706, 250000,
          116.49902343749999,44.55916341529182, 250000
                ]
            },
            "material" : {
                "polylineOutline" : {
                    "color" : {
                        "rgba" : [255, 165, 0, 255]
                    },
                    "outlineColor" : {
                        "rgba" : [0, 0, 0, 255]
                    },
                    "outlineWidth" : 2
                }
            },
            "width" : 5
        }
    }, {
        "id" : "purpleLine",
        "name" : "Purple arrow at height",
        "polyline" : {
            "positions" : {
                "cartographicDegrees" : [
                    118.43261718749999,41.902277040963696, 500000,
          107.314453125,40.51379915504413, 500000
                ]
            },
            "material" : {
                "polylineArrow" : {
                    "color" : {
                        "rgba" : [148, 0, 211, 255]
                    }
                }
            },
            "followSurface" : false,
            "width" : 10
        }
    }, {
        "id" : "dashedLine",
        "name" : "Blue dashed line",
        "polyline" : {
            "positions" : {
                "cartographicDegrees" : [
                    115.8837890625,35.38904996691167, 0,
                    103.71093749999999,40.38002840251183, 500000,
                    94.482421875,
          33.137551192346145,0
                ]
            },
            "material" : {
                "polylineDash" : {
                    "color" : {
                        "rgba" : [0, 255, 255, 255]
                    }
                }
            },
            "width" : 4
        }
    }];
    

    // var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
    // viewer.dataSources.add(dataSourcePromise);
    // viewer.zoomTo(dataSourcePromise);






    // 添加黑色大理石花纹
    var layers = viewer.imageryLayers;
//  var blackMarble = layers.addImageryProvider(Cesium.createTileMapServiceImageryProvider({
//      url : 'https://cesiumjs.org/blackmarble',
//      credit : 'Black Marble imagery courtesy NASA Earth Observatory',
//      flipXY : true // Only old gdal2tile.py generated tilesets need this flag.
//  }));
//  blackMarble.alpha = 0.5;
//  blackMarble.brightness = 2.0;
// 添加曲线
function createFlyLines(points,routes) {
    points.forEach(point=>{
        console.log(point)
        const dot = Cesium.Cartesian3.fromDegrees(point.pot[0],point.pot[1],0);
        viewer.entities.add({
            position: dot,
            point: {
                pixelSize: 10,
                color: Cesium.Color.BLUE
            }
        });
        //大批量操作时，临时禁用事件可以提高性能
        // viewer.entities.suspendEvents(); 
    })
    routes.forEach(route => {
        let from = points.filter(p=>{
            return p.id == route[0]
        }) 
        let to = points.filter(p=>{
            return p.id == route[1]
        }) 
        const startPoint = Cesium.Cartesian3.fromDegrees(from[0].pot[0],from[0].pot[1],0);
        const endPoint = Cesium.Cartesian3.fromDegrees(to[0].pot[0],to[0].pot[1],0);
        // 添加连线
        //   添加线的材质
        let material = new Cesium.PolylineTrailMaterialProperty({
            color: Cesium.Color.YELLOW,
            duration: 3000,
            trailImage: "img/color1.png"
        });
        //   添加线
        viewer.entities.add({
            polyline: {
            positions: generateCurve(startPoint, endPoint),
            width: 2,    
            material: material
            }
        });
    });
    // const center = data.center;
    // const cities = data.points;
    // const startPoint = Cesium.Cartesian3.fromDegrees(center.lon,center.lat,0);
    //  //添加起点
    // viewer.entities.add({
    //   position: startPoint,
    //   point: {
    //     pixelSize: center.size,
    //     color: center.color
    //   }
    // });
    //  //大批量操作时，临时禁用事件可以提高性能
    // viewer.entities.suspendEvents(); 
    // //散点

    // cities.map(city => {
    //   const endPoint = Cesium.Cartesian3.fromDegrees(city.lon, city.lat, 0);
    //     //   添加终止点
    //   viewer.entities.add({
    //     position: endPoint,

    //     point: {
    //       pixelSize: city.size - 5,

    //       color: city.color
    //     }
    //   });
    // //   添加线的材质
    //   let material = new Cesium.PolylineTrailMaterialProperty({
    //     color: Cesium.Color.YELLOW,
    //     duration: 3000,
    //     trailImage: "img/color1.png"
    //   });
    // //   添加线
    //   viewer.entities.add({
    //     polyline: {
    //       positions: generateCurve(startPoint, endPoint),
    //       width: 2,    
    //       material: material
    //     }
    //   });
    // });

    // viewer.entities.resumeEvents();

    // viewer.flyTo(viewer.entities);
  }
//   生成曲线
 function generateCurve(startPoint, endPoint) {
    //  计算两点之间的中心点
    let addPointCartesian = new Cesium.Cartesian3();

    Cesium.Cartesian3.add(startPoint, endPoint, addPointCartesian);

    let midPointCartesian = new Cesium.Cartesian3();

    Cesium.Cartesian3.divideByScalar(addPointCartesian, 2, midPointCartesian);

    let midPointCartographic = Cesium.Cartographic.fromCartesian(
      midPointCartesian
    );

    midPointCartographic.height = Cesium.Cartesian3.distance(startPoint, endPoint) / 5;

    let midPoint = new Cesium.Cartesian3();

    Cesium.Ellipsoid.WGS84.cartographicToCartesian(midPointCartographic,midPoint);
    // 插值计算
    let spline = new Cesium.CatmullRomSpline({
      times: [0.0, 0.5, 1.0],

      points: [startPoint, midPoint, endPoint]
    });

    let curvePoints = [];

    for (let i = 0, len = 200; i < len; i++) {
      curvePoints.push(spline.evaluate(i / len));
    }

    return curvePoints;
  }



createFlyLines(points,routes)

var controls = [
    Cesium.Cartesian3.fromDegrees(110, 10,0),
    Cesium.Cartesian3.fromDegrees(111, 11,10000),
    Cesium.Cartesian3.fromDegrees(112, 9,0),
    Cesium.Cartesian3.fromDegrees(114, 10,1000),
    Cesium.Cartesian3.fromDegrees(113, 8.100000)
    ];
    for (let i = 0; i < controls.length; i++) {
    viewer.entities.add({
    position: controls[i],
    point: {
    color: Cesium.Color.RED,
    pixelSize: 10
    }
    });
    }
    viewer.zoomTo(viewer.entities);
    var spline = new Cesium.CatmullRomSpline({
        times: [0.0, 0.25, 0.5, 0.75, 1],
        points: controls
        });
        var positions = [];
for (let i = 0; i <= 100; i++) {
    var cartesian3 = spline.evaluate(i / 100);
    positions.push(cartesian3);
}
viewer.entities.add({
    polyline: {
      positions: positions,

      width: 2,
        
    //   material: material
    }
  });
  viewer.scene.fxaa = false;
}