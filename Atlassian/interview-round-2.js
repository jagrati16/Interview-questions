// returns the state of *all* features for current user
function fetchAllFeatures() {
  console.log("calling feature api");
  // in reality, this would have been a `fetch` call:
  // `fetch("/api/features/all")`
  return new Promise((resolve, reject) => {
    const sampleFeatures = {
      "extended-summary": false,
      "feedback-dialog": false,
    };
    // setTimeout(resolve, 100, sampleFeatures);
    setTimeout(reject, 100, null);
  });
}

const devoverride = {};

const addDevOverrideForFeature = (ffName, overrideValue) => {
  devoverride[ffName] = overrideValue;
};

const getFeatureState = (featureFlag, defaultValue) => {
  let cache = null;
  return new Promise((resolve, reject) => {
    if (devoverride[featureFlag] !== undefined) {
      return resolve(devoverride[featureFlag]);
    }

    if (cache && cache[featureFlag]) {
      return resolve(cache[featureFlag]);
    } else {
      fetchAllFeatures()
        .then((allFeaturesState) => {
          cache = allFeaturesState;
          resolve(allFeaturesState[featureFlag]);
        })
        .catch((err) => {
          resolve(defaultValue);
          //reject(err);
        });
    }
  });
};

//addDevOverrideForFeature("extended-summary", false);

// src/feature-x/summary.js
getFeatureState("extended-summary", false).then(function (isEnabled) {
  if (isEnabled) {
    console.log("show extended summary");
  } else {
    console.log("show brief summary");
  }
});

// src/feature-y/feedback-dialog.js

// getFeatureState("feedback-dialog").then(function (isEnabled) {
//   if (isEnabled) {
//     console.log("show feedback button");
//     //makeFeedbackButtonVisible();
//   } else {
//     console.log("not unabled");
//   }
// });
