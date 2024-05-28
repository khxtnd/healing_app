package com.healing_app.rn_to_kotlin.nativemodules

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.healing_app.model.UserInfo

class DatabaseNativeModule (reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext){
    override fun getName(): String {
        return "DatabaseNativeModule"
    }

    @ReactMethod
    fun sendDataToNative(name: String, data: ReadableMap){
        try {


            val userInfo = UserInfo(
                data.getString("username") ?: "",
                data.getString("password") ?: "",
            )
            Log.e("khanhpq", userInfo.username+" "+userInfo.password)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }
}