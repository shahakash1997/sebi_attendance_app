package com.sebi_attendance;

import android.location.Location;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SEBINativeModule extends ReactContextBaseJavaModule {
    public SEBINativeModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
    }

    public static String MODULE_NAME = "SEBIAttendanceAppUtils";

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void checkDistance(
            @NonNull Double baseLat,
            @NonNull Double baseLong,
            @NonNull Double userLat,
            @NonNull Double userLong,
            @NonNull Promise promise
    ) {
        try {
            Location baseLocation = new Location("OFFICE_LOCATION");
            baseLocation.setLatitude(baseLat);
            baseLocation.setLongitude(baseLong);

            Location userLocation = new Location("EMPLOYEE_LOCATION");
            userLocation.setLatitude(userLat);
            userLocation.setLongitude(userLong);
            float distance = baseLocation.distanceTo(userLocation);
            promise.resolve(distance);
        } catch (Exception exception) {
            promise.reject("LOCATION_UTIL_ERROR", exception.getMessage());
        }

    }


}
