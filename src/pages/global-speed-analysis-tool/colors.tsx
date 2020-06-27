import * as THREE from "three";

export const AppColors = {
  AnalysisAreaMarker: "white",
  friendlyLocation: "orange",
  enemyLocation: "red",
  neutralLocation: "green",
};

export const MyThreeColors = {
  friendlyLocation: new THREE.Color(AppColors.friendlyLocation),
  enemyLocation: new THREE.Color(AppColors.enemyLocation),
  neutralLocation: new THREE.Color(AppColors.neutralLocation),
};

export const detailColor = "#7f89ff";
