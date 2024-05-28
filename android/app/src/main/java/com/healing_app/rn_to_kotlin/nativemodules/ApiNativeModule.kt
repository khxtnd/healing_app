package com.healing_app.rn_to_kotlin.nativemodules

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.healing_app.kotlin_to_rn.EventToRN

class ApiNativeModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
    init {
        EventToRN.getInstance().init(reactContext)
    }
    override fun getName(): String {
        return "ApiNativeModule"
    }
}