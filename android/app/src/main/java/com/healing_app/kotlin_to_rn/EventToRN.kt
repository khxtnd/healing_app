package com.healing_app.kotlin_to_rn

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableNativeMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class EventToRN private constructor() {
    private object InstanceHolder {
        val instance = EventToRN()
    }

    companion object {
        @JvmStatic
        fun getInstance() = InstanceHolder.instance
    }

    private var context: ReactContext? = null

    fun init(reactContext: ReactContext) {
        this.context = reactContext
    }

    fun sendEvent(data: WritableNativeMap) {
        context
            ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            ?.emit("EventToRN", data)
    }
}
