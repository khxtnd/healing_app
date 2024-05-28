package com.healing_app.rn_to_kotlin

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.healing_app.rn_to_kotlin.nativemodules.ApiNativeModule
import com.healing_app.rn_to_kotlin.nativemodules.DatabaseNativeModule
import com.healing_app.rn_to_kotlin.nativemodules.SharedPreferenceNativeModule


class NativeModulePackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return arrayListOf(
            DatabaseNativeModule(reactContext),
            ApiNativeModule(reactContext),
            SharedPreferenceNativeModule(reactContext)
        )
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
