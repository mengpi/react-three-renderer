import React3DInstance from '../React3DInstance';

import THREEElementDescriptor from './THREEElementDescriptor';

import THREE from 'three';

import PropTypes from 'react/lib/ReactPropTypes';

import warning from 'fbjs/lib/warning';

const propProxy = {
  gammaInput: {
    type: PropTypes.bool,
    default: false,
  },
  gammaOutput: {
    type: PropTypes.bool,
    default: false,
  },
  context: {
    type: PropTypes.string.isRequired,
  },
  mainCamera: {
    type: PropTypes.string,
    default: undefined,
  },
  canvas: {
    type: PropTypes.instanceOf(HTMLCanvasElement).isRequired,
  },
  onAnimate: {
    type: PropTypes.func,
    default: undefined,
  },
  clearColor: {
    type: PropTypes.instanceOf(THREE.Color),
    default: 0,
  },
  shadowMapEnabled: {
    type: PropTypes.bool,
  },
  shadowMapType: {
    type: PropTypes.bool,
  },
  shadowMapCullFace: {
    type: PropTypes.bool,
  },
  shadowMapDebug: {
    type: PropTypes.bool,
  },
  onRecreateCanvas: {
    type: PropTypes.func.isRequired,
    default: undefined,
  },
  pixelRatio: {
    type: PropTypes.number,
    default: 1,
  },
  width: {
    type: PropTypes.number.isRequired,
  },
  height: {
    type: PropTypes.number.isRequired,
  },
  antialias: {
    type: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
    ]),
    default: false,
  },
};

class React3Descriptor extends THREEElementDescriptor {
  constructor(react3RendererInstance) {
    super(react3RendererInstance);

    this.propTypes = {
      ...this.propTypes,

      canvasStyle: PropTypes.any,
    };

    Object.keys(propProxy).forEach(propName => {
      const info = propProxy[propName];
      const propNameFirstLetterCapital = propName[0].toUpperCase() + propName.substr(1);

      const updateFunctionName = `update${propNameFirstLetterCapital}`;

      if (process.env.NODE_ENV !== 'production') {
        warning(React3DInstance.prototype.hasOwnProperty(updateFunctionName), 'Missing function %s in React3DInstance class.', updateFunctionName);
      }

      const propInfo = {
        type: info.type,
        update(threeObject, newValue) {
          threeObject[updateFunctionName](newValue);
        },
      };

      if (info.hasOwnProperty('default')) {
        propInfo.default = info.default;
      }

      this.hasProp(propName, propInfo);
    });
  }

  construct(props) {
    return new React3DInstance(props, this.react3RendererInstance);
  }

  applyInitialProps(threeObject, props) {
    super.applyInitialProps(threeObject, props);

    threeObject.initialize();
  }

// gets called every time there are children to be added
  // this can be called multiple times as more children are added.
  addChildren(threeObject, children) {
    threeObject.addChildren(children);
  }

  addChild(threeObject, child) {
    threeObject.addChildren([child]);
  }

  moveChild() {
    // do nothing
  }

  removeChild(threeObject, child) {
    threeObject.removeChild(child);
  }

  _updateOnRecreateCanvas(threeObject, callback) {
    threeObject.updateOnRecreateCanvas(callback);
  }

  _updateCanvas(threeObject, canvas) {
    threeObject.updateCanvas(canvas);
  }

  _updateHeight(threeObject, newHeight) {
    threeObject.updateHeight(newHeight);
  }

  unmount(threeObject) {
    threeObject.unmount();
    super.unmount(threeObject);
  }
}

export default React3Descriptor;
