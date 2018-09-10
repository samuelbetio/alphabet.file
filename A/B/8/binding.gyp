{
  "targets": [
    {
      'target_name': "dbr",
      'sources': [ "dbr.cc" ],
      'conditions': [
          ['OS=="linux"', {
            'defines': [
              'LINUX_DBR',
            ],
            'include_dirs': [
                "/home/xiao/Dynamsoft/BarcodeReader4.0/Include"
            ],
            'libraries': [
                "-lDynamsoftBarcodeReaderx64", "-L/home/xiao/Dynamsoft/BarcodeReader4.0/Redist"
            ],
            'copies': [
            {
              'destination': 'build/Release/',
              'files': [
                '/home/xiao/Dynamsoft/BarcodeReader4.0/Redist/libDynamsoftBarcodeReaderx64.so'
              ]
            }]
          }],
          ['OS=="win"', {
            'defines': [
              'WINDOWS_DBR',
            ],
            'include_dirs': [
                "E:\Program Files (x86)\Dynamsoft\Barcode Reader 4.3\Components\C_C++\Include"
            ],
            'libraries': [
                "-lE:\Program Files (x86)\Dynamsoft\Barcode Reader 4.3\Components\C_C++\Lib\DBRx64.lib"
            ],
            'copies': [
            {
              'destination': 'build/Release/',
              'files': [
                'E:\Program Files (x86)\Dynamsoft\Barcode Reader 4.3\Components\C_C++\Redist\DynamsoftBarcodeReaderx64.dll'
              ]
            }]
          }],
          ['OS=="mac"', {
            'defines': [
              'MAC_DBR',
            ],
            'include_dirs' : [
                "/Applications/Dynamsoft/Barcode\ Reader\ 4.1/Include"
            ],
            'libraries': [
                "-lDynamsoftBarcodeReader"
            ]
          }]
      ]
    }
  ]
}
