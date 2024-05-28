package com.healing_app.rn_to_kotlin.nativemodules

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.healing_app.model.UserInfo

class SharedPreferenceNativeModule (reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "SharedPreferenceNativeModule"
    }

    @ReactMethod
    fun getFriendInfo(name: String, promise: Promise){
        try {
            val friendInfo: WritableMap = Arguments.createMap()
            friendInfo.putString("nameFriend", "Nam")
            friendInfo.putInt("ageFriend", 28)

            promise.resolve(friendInfo)

        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}