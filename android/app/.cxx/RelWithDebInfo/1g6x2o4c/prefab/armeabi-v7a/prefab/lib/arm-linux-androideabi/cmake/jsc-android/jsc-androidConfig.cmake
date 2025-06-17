if(NOT TARGET jsc-android::jsc)
add_library(jsc-android::jsc SHARED IMPORTED)
set_target_properties(jsc-android::jsc PROPERTIES
    IMPORTED_LOCATION "/Users/anirudhsingh/.gradle/caches/8.13/transforms/579d72cfca4abb6b9ed12a1bcc998c01/transformed/jsc-android-2026004.0.1/prefab/modules/jsc/libs/android.armeabi-v7a/libjsc.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/anirudhsingh/.gradle/caches/8.13/transforms/579d72cfca4abb6b9ed12a1bcc998c01/transformed/jsc-android-2026004.0.1/prefab/modules/jsc/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

