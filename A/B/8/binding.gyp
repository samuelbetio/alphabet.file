{
  "targets": [
    {
      'target_name': "dbr",
      'sources': [ "dbr.cc" ],
      'conditions': [
          ['OS=="win"', {
            'defines': [
              'WINDOWS_DBR',
            ],
            'include_dirs': [
                "E:\\Program Files (x86)\\Dynamsoft\\Barcode Reader 6.0\\Components\\C_C++\\Include"
            ],
            'libraries': [
                "-lE:\\Program Files (x86)\\Dynamsoft\\Barcode Reader 6.0\\Components\\C_C++\\Lib\\DBRx64.lib"
            ],
            'copies': [
            {
              'destination': 'build/Release/',
              'files': [
                'E:\\Program Files (x86)\\Dynamsoft\\Barcode Reader 6.0\\Components\\C_C++\\Redist\\x64\\DynamsoftBarcodeReaderx64.dll'
              ]
            }]
          }]
      ]
    }
  ]
}
