

class PolylineTrailMaterialProperty {

    constructor(options) {

        options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);

        this._definitionChanged = new Cesium.Event();

        this._color = undefined;

        this._colorSubscription = undefined;

        this.color = options.color;

        this.duration = options.duration;

        this.trailImage = options.trailImage;

        this._time = performance.now();

    }

}

Cesium.defineProperties(PolylineTrailMaterialProperty.prototype, {

    isConstant: {

        get: function() {

            return false;

        }

    },

    definitionChanged: {

        get: function() {

            return this._definitionChanged;

        }

    },

    color: Cesium.createPropertyDescriptor('color')

});

PolylineTrailMaterialProperty.prototype.getType = function(time) {

    return 'PolylineTrail';

}

PolylineTrailMaterialProperty.prototype.getValue = function(time, result) {

    if (!Cesium.defined(result)) {

        result = {};

    }

    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);

    //result.image = Cesium.Material.PolylineTrailImage;

    result.image = this.trailImage;

    result.time = ((performance.now() - this._time) % this.duration) / this.duration;

    return result;

}

PolylineTrailMaterialProperty.prototype.equals = function(other) {

    return this === other ||

        (other instanceof PolylineTrailMaterialProperty &&

            Cesium.Property.equals(this._color, other._color))

}

Cesium.Material.PolylineTrailType = 'PolylineTrail';

Cesium.Material.PolylineTrailImage = "img/color2.png";

Cesium.Material.PolylineTrailSource = "czm_material czm_getMaterial(czm_materialInput materialInput)"

                                                      +"{czm_material material = czm_getDefaultMaterial(materialInput);"

                                                          +"vec2 st = materialInput.st;"

                                                          +"vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));"

                                                          +"material.alpha = colorImage.a * color.a;"

                                                          +"material.diffuse = (colorImage.rgb+color.rgb)/2.0;"

                                                          +"return material;"+

                                                      "}";

Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailType, {

    fabric: {

        type: Cesium.Material.PolylineTrailType,

        uniforms: {

            color: new Cesium.Color(42, 54, 118, 0.7),

            image: Cesium.Material.PolylineTrailImage,

            time: 0

        },

        source: Cesium.Material.PolylineTrailSource

    },

    translucent: function(material) {

        return true;

    }

});

Cesium.PolylineTrailMaterialProperty = PolylineTrailMaterialProperty
var data = {
    center: {
      id: 0,

      lon: 114.302312702,

      lat: 30.598026044,

      size: 20,

      color: Cesium.Color.PURPLE
    },

    points: [
      {
        id: 1,

        lon: 115.028495718,

        lat: 30.200814617,

        color: Cesium.Color.YELLOW,

        size: 15
      },

      {
        id: 2,

        lon: 110.795000473,

        lat: 32.638540762,

        color: Cesium.Color.RED,

        size: 15
      },

      {
        id: 3,

        lon: 111.267729446,

        lat: 30.698151246,

        color: Cesium.Color.BLUE,

        size: 15
      },

      {
        id: 4,

        lon: 112.126643144,

        lat: 32.058588576,

        color: Cesium.Color.GREEN,

        size: 15
      },

      {
        id: 5,

        lon: 114.885884938,

        lat: 30.395401912,

        color: Cesium.Color.BLUE,

        size: 15
      },

      {
        id: 6,

        lon: 112.190419415,

        lat: 31.043949588,

        color: Cesium.Color.BLUE,

        size: 15
      },

      {
        id: 7,

        lon: 113.903569642,

        lat: 30.93205405,

        color: Cesium.Color.BLUE,

        size: 15
      },

      {
        id: 8,

        lon: 112.226648859,

        lat: 30.367904255,

        color: Cesium.Color.BLUE,

        size: 15
      },

      {
        id: 9,

        lon: 114.86171677,

        lat: 30.468634833,

        color: Cesium.Color.BLUE,

        size: 15
      },
      {
        id: 10,

        lon: 114.317846048,

        lat: 29.848946148,

        color: Cesium.Color.BLUE,

        size: 15
      },
      {
        id: 11,

        lon: 113.371985426,

        lat: 31.70498833,

        color: Cesium.Color.BLUE,

        size: 15
      },
      {
        id: 12,

        lon: 109.468884533,

        lat: 30.289012191,

        color: Cesium.Color.BLUE,

        size: 15
      },
      {
        id: 13,

        lon: 113.414585069,

        lat: 30.368350431,

        color: Cesium.Color.SALMON,

        size: 15
      },
      {
        id: 14,

        lon: 112.892742589,

        lat: 30.409306203,

        color: Cesium.Color.WHITE,

        size: 15
      },
      {
        id: 15,

        lon: 113.16085371,

        lat: 30.667483468,

        color: Cesium.Color.SALMON,

        size: 15
      },
      {
        id: 16,

        lon: 110.670643354,

        lat: 31.74854078,

        color: Cesium.Color.PINK,

        size: 15
      }
    ],
    options: {
      name: "",
      polyline: {
        width: 2,
        material: [Cesium.Color.AQUA, 3000]
      }
    }
  };


