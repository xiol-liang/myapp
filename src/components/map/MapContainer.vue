<template>
    <div id="map-container">
<!--        <RightBar />-->
    </div>
</template>

<script>
    import AMapLoader from '@amap/amap-jsapi-loader';
    // import RightBar from "../layout/RightBar";

    export default {
        name: "MapContainer",
        // components: {RightBar},
        data() {
            return {
                isShowThemeBox: false,
                map: null, //初始化 map 对象
                toolbar: null,  //缩放控件 地图的放大和缩小
                Scale: null,    //比例尺控件 显示当前地图的比例尺
                HawkEye: null,  //鹰眼控件 地图缩略图，标记当前展示区域
                MapType: null,  //图层切换控件 切换不同的地图类型
                ControlBar: null,   //控制罗盘控件 控制地图旋转和倾斜
                mapstyle: ['fresh','normal','dark','light','whitesmoke','grey','macaron','blue','darkblue']
            }
        },
        created() {
            // 在地图组件中监听事件
            this.$EventBus.$on('change-theme', val => {
                this.setMapStyle(val);
            });
        },
        beforeDestroy() {
            this.$EventBus.$off('change-theme');
        },
        methods: {
            initMap() {
                AMapLoader.load({
                    key: "757075ebd08a48a2d2f9b7f0f52bef32", //此处填入我们注册账号后获取的Key
                    version: "2.1Beta", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                    plugins: [], //需要使用的的插件列表，如比例尺'AMap.Scale'等
                    AMapUI: {
                        version: '1.1',
                        // plugins:['overlay/SimpleMarker']
                    }
                }).then((AMap) => {
                    this.map = new AMap.Map("map-container", { //设置地图容器id
                        // zooms:[1,20],   //设置地图级别范围
                        zoom: 5, //初始化地图级别
                        center: [105.602725, 37.076636], //初始化地图中心点位置
                        // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
                        pitch: 50, //地图俯仰角度，有效范围 0 度- 83 度
                        viewMode: '3D', //设置地图模式
                        rotateEnable: true, //是否开启地图旋转交互 鼠标右键 + 鼠标画圈移动 或 键盘Ctrl + 鼠标左键画圈移动
                        pitchEnable: true, //是否开启地图倾斜交互 鼠标右键 + 鼠标上下移动或键盘Ctrl + 鼠标左键上下移动
                        terrain: true,  //开启地形图
                        zooms: [1, 20], //地图显示的缩放级别范围
                        features: ['bg', 'road', 'building', 'point']   //地图显示要素：区域面，道路，建筑物，标注
                    });
                    // let weixing = new AMap.TileLayer.Satellite({    //定义卫星图层
                    //     zIndex:109
                    // });
                    // this.map.add(weixing);  //添加卫星图层到地图

                    // this.map.plugin(['AMap.MapType','AMap.Scale','AMap.HawkEye'],() => {
                    //     this.map.addControl(new AMap.MapType());    //图层切换
                    //     this.map.addControl(new AMap.Scale());      //比例尺
                    //     this.map.addControl(new AMap.HawkEye());    //鹰眼
                    // })
                    this.map.plugin([
                        'AMap.ToolBar',
                        'AMap.Scale',
                        'AMap.HawkEye',
                        'AMap.MapType',
                        'AMap.Geolocation',
                        'AMap.ControlBar',
                    ], () => {
                        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                        this.toolbar = new AMap.ToolBar({showZoomNum:true});//缩放工具条实例化
                        this.map.addControl(this.toolbar);
                        // this.toolbar.show(); //缩放工具展示
                        this.toolbar.hide(); //缩放工具隐藏

                        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
                        this.Scale = new AMap.Scale({
                            position: {
                                left: "60px",
                                bottom: "320px"
                            }
                        });//比例尺实例化
                        this.map.addControl(this.Scale);

                        // 在图面添加鹰眼控件，在地图左上角显示地图的缩略图
                        this.HawkEye = new AMap.HawkEye({
                            width: "200px",
                            height: "180px",
                            isOpen:true,
                            position: {
                                left: "0px",
                                top: "60px",
                            }
                        })
                        this.map.addControl(this.HawkEye);


                        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
                        this.MapType = new AMap.MapType()
                        this.map.addControl(this.MapType);
                        this.MapType.hide();

                        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
                        // this.map.addControl(new AMap.Geolocation());

                        // 在图面添加控制罗盘控件，用来控制地图旋转和倾斜
                        this.ControlBar = new AMap.ControlBar({
                            position: {
                                right: "47.5%",
                                top: "100px",
                            }
                        })
                        this.map.addControl(this.ControlBar);
                        // this.ControlBar.hide();

                        AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {

                            var layerCtrl = new BasicControl.LayerSwitcher({
                                //my-red 见上方style
                                // theme: 'my-red',
                                theme: 'my-blue',
                                position: {
                                    top: "100px",
                                    right: "20px"
                                },
                                zIndex: 104
                            });
                            this.map.addControl(layerCtrl);
                            // this.$nextTick(() => {
                            //     this.moveLayerSwitcher();
                            // });
                            this.moveLayerSwitcher();

                            //缩放控件
                            // this.map.addControl(new BasicControl.Zoom({
                            //     //内置的dark主题
                            //     theme: 'dark',
                            //
                            //     //左下角
                            //     position: 'bl'
                            // }));
                            //缩放控件
                            var zoomCtrl = new BasicControl.Zoom({
                                //见zoom-green.css
                                // theme: 'my-green',
                                position: {
                                    left: "20px",
                                    bottom: "320px"
                                },
                                showZoomNum: true
                            });
                            this.map.addControl(zoomCtrl);
                            // //动态加载css
                            // AMapUI.loadCss('./zoom-green.css', () => {
                            //
                            //
                            // });
                        });
                        // this.setMapStyle();
                        // this.setMapFeatures();
                        const canvas = document.querySelector('.amap-layer');
                        console.log(canvas,'test-canvas');
                        canvas.addEventListener('click',this.handleCanvasClick);

                    });
                }).catch(e => {
                    console.log(e);
                })
            },
            handleCanvasClick(){
                console.log('clicked canvas');
                this.$EventBus.$emit('hide-themebox');
                // if (this.isShowThemeBox) {
                //
                // }
            },
            changeStyle() {
                const body = document.querySelector('body');
                body.style.display = 'unset';   //去掉之前的flex布局
                let styleSheet = document.styleSheets[document.styleSheets.length-1];
                styleSheet.insertRule('body::before {background: none;}',styleSheet.cssRules.length); //
                styleSheet.insertRule('.amap-copyright, .amap-logo {position: unset;}',styleSheet.cssRules.length); //去掉高德地图Logo
                styleSheet.insertRule('.amap-ui-control-theme-my-blue, .amap-amap-ui-control-layer, .amap-ui-control-layer-expanded {box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4); background: #00bfff; z-index: 105; color: #fff}',styleSheet.cssRules.length);
                // styleSheet.insertRule('.amap-maptype {top: 80px !important;}',styleSheet.cssRules.length);

                const layerChangeBtn = document.querySelector(".amap-ui-control-layer-expanded");
                if (layerChangeBtn) {
                    console.log(layerChangeBtn,'test-layerChangeBtn');
                    layerChangeBtn.style.zIndex = 107;
                }

                // setTimeout(function () {
                    // const mapcontrol = document.getElementsByClassName('amap-maptype');
                    // const el = Array.from(mapcontrol);
                    // if (el.length > 0) {
                    //     el[0].style.top = '80px';
                    // }
                    // const logo = document.querySelector('.amap-logo');
                    // console.log(logo,'test-logo')
                    // const copyright = document.querySelector('.amap-copyright');
                    // console.log(copyright,'test-copyright')
                    // if(logo) {
                    //     logo.style.position = 'unset';
                    //     // logo.parentNode.removeChild(logo);
                    // }
                    // if(copyright) {
                    //     copyright.style.position = 'unset';
                    //     // copyright.parentNode.removeChild(copyright);
                    // }

                    // let observer = new MutationObserver(function (mutations) {
                    //     mutations.forEach(function (mutation) {
                    //         //检查每个新增节点
                    //         mutation.addedNodes.forEach(function (node) {
                    //             //判断是否是logo
                    //             if (node.classList && node.classList.contains('amap-logo') || node.classList.contains('amap-copyright')) {
                    //                 node.parentNode.removeChild(node);
                    //                 observer.disconnect();
                    //             }
                    //         })
                    //     })
                    // })

                // },500);
            },
            setMapStyle(index) { //设置地图主题样式
                let styleName = "amap://styles/" + this.mapstyle[index];
                this.map.setMapStyle(styleName);
            },
            setMapFeatures() {  //设置地图显示要素
                let features = ["point","road"];
                this.map.setFeatures(features);
            },
            moveLayerSwitcher() {
                const layerswitcher = document.querySelector('.amap-ui-control-theme-my-blue');
                // const rightbar = this.$refs.rightbar;
                // console.log(this.$refs,'test-ref')
                // console.log(rightbar,'test-rightbar');
                // console.log(layerswitcher,'test-move')
                if (layerswitcher) {
                    layerswitcher.style.zIndex = 101;
                }
            }
        },
        mounted() {
    //         // 创建前置 script 标签，引入高德地图API
    //         const beforeScript = document.createElement('script');
    //         beforeScript.innerHTML = `
    //   window._AMapSecurityConfig = {
    //     securityJsCode: "757075ebd08a48a2d2f9b7f0f52bef32",
    //   };
    // `;
    //         beforeScript.src = 'https://webapi.amap.com/loader.js';
    //         document.head.appendChild(beforeScript);
    //
    //         // 动态创建第一个 script 标签，引入高德地图API
    //         const mapScript = document.createElement('script');
    //         mapScript.src = '//webapi.amap.com/maps?v=2.0&key=757075ebd08a48a2d2f9b7f0f52bef32';
    //         mapScript.async = true;
    //         document.head.appendChild(mapScript);

            // 动态创建第二个 script 标签，引入高德地图UI组件库
            // const uiScript = document.createElement('script');
            // uiScript.src = '//webapi.amap.com/ui/1.1/main.js?v=1.1.1';
            // uiScript.async = true;
            // document.head.appendChild(uiScript);
            //
            // // 在 API 加载完成后执行地图初始化和操作
            // uiScript.onload = () => {
            //
            //
            //
            // };
            //DOM初始化完成进行地图初始化
            this.initMap();
            this.$nextTick(() => {
                this.changeStyle();
            })
        }
    }
</script>

<style lang="scss" scoped>
    #map-container {
        margin: 0 auto;
        width: 100%;
        /*height: calc(100vh - 60px);*/
        height: calc(100vh - 0px);
        z-index: 100;
    }
    .amap-ui-control-theme-my-red .amap-ui-control-layer {
         box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
         background: red;
     }
    .amap-ui-control-theme-my-red .amap-ui-control-layer-expanded {
         color: #fff;
         background: red;
     }
    .amap-ui-control-theme-my-red .amap-ui-control-layer-toggle {
         color: #fff;
     }
</style>