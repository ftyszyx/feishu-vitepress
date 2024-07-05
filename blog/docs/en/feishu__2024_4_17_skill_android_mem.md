---
create_time: 1715931285
title: android_mem
categories:
  - skill
---

Powered by Android Stuiod Profiler

# Profiler usage:

Reference: https://blog.csdn.net/Calvin_zhou/article/details/119681272

Select View &gt; Tool Windows &gt; Profiler or click the Profile icon in the toolbar

<img src="/assets/UTjKb2ykyod7sXxAdUvcWXZ6nCh.png" src-width="827" class="m-auto" src-height="330" align="center"/>

TAP ANYWHERE ON THE MEMORY TIMELINE TO OPEN THE MEMORY PROFILER

<img src="/assets/RC52bj5IQo6GyJxCXNEc4dLHnZb.png" src-width="809" class="m-auto" src-height="372" align="center"/>
Memory Classification:

Java: The memory of an object allocated from Java or Kotlin code

Native: The memory of an object allocated from C or C++ code

Graphics: The graphics buffer queue is the memory used to display pixels to the screen, including GL surfaces, GL textures, and so on

Stack: The memory used by the native and Java stacks in your app. This is usually related to how many threads your app runs

Code: Your app is used to process code and resources (such as dex bytecode, optimized or compiled dex code, . so libraries and fonts).

Others: The system used by your app is not sure how to classify memory

Allocated: The number of Java/Kotlin objects assigned by your app. This number does not count towards objects assigned in C or C++

# Get the actual memory usage of the application

https://zhuanlan.zhihu.com/p/372883142

**Generally, PSS is used as a memory performance indicator, use method 3**

VSS - Virtual Set Size (including memory occupied by shared libraries)

RSS - Resident Set Size Actual use of physical memory (including memory occupied by shared libraries)

PSS - Proportional Set Size Actual physical memory used (proportional allocation of memory occupied by shared libraries) If 3 processes use the same shared library, then the PSS of each process includes 1/3 of the size of the shared library memory. Usually we use PSS size as a memory performance metric.USS - Physical memory occupied by the Unique Set Size process alone (excluding memory occupied by shared libraries) 

In general, the memory usage is as follows: VSS &gt;= RSS &gt;= PSS &gt;= USS

## Method 1 adb

1. adb shell

<img src="/assets/ZfYzb7Sr8ogO7VxwcXGcIPufnTh.png" src-width="279" src-height="61"/>

1. top

<img src="/assets/A2mYbmbujoDNLMxWaRjck16DnOd.png" src-width="287" src-height="58"/>

1. Check the PID based on the package name

<img src="/assets/Mq8xbYQvnouhJExX6uUcyekwnmd.png" src-width="821" class="m-auto" src-height="138" align="center"/>
1. adb shell dumpsys meminfo package name or process ID

```yaml
adb shell dumpsys meminfo com.tencent.mobileqq:mini3
```

<img src="/assets/ArlTbW8o6oi9ENx6kR9cVK4Bnac.png" src-width="1064" class="m-auto" src-height="846" align="center"/>
1. If you want to see the memory cost of all processes of an app

Use the command adb shell dumpsys meminfo | findstr package name (win10 cmd), as shown in the figure, you can know which processes QQ has and the memory occupation of the corresponding process.

<img src="/assets/IhYJbTo8coD5qyxEYSCcINL2nNQ.png" src-width="756" src-height="210"/>
## Method 2 pid status

"/proc/" + android.os.Process.myPid() + "/status" path file.

```yaml
public static long getProcessRealMemory() {
        String memFilePath = "/proc/" + android.os.Process.myPid() + "/status";
        BufferedReader bufferedReader = null;
        try {
            FileInputStream fileInputStream = new FileInputStream(memFilePath);
            InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream, "UTF-8");
            bufferedReader = new BufferedReader(inputStreamReader);
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                Log.d(TAG, " read line : " + line);
                if(! TextUtils.isEmpty(line) && line.contains("VmRSS")) {String rss = line.split(":")[1].trim().split( " ")[0];
                    return Integer.parseInt(rss) * 1024;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(bufferedReader != null) {
                try{
                    bufferedReader.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return -1;
    }
```

Advantages: There is no permission restriction for the time being, and it can be obtained in real time

Disadvantages: The memory obtained by this method of reading files is RSS. What we usually expect is to get a PSS

Difference between RSS and PSS:

RSS - Resident Set Size Actual use of physical memory (including memory occupied by shared libraries)

PSS - Proportional Set Size Actual physical memory used (proportional allocation of memory occupied by shared libraries) If 3 processes use the same shared library, then the PSS of each process includes 1/3 of the size of the shared library memory. Usually we use PSS size as a memory performance metric.

## Method 3 ActivityManager (PSS)

```yaml
ActivityManager activityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
                final Debug.MemoryInfo[] memInfo = activityManager.getProcessMemoryInfo(new int[]{android.os.Process.myPid()});
final int totalPss = memInfo[0].getTotalPss();
```

Pros: PSS is obtained

Disadvantages:Android P limits the frequency above,**It takes about 5 minutes (different mobile phones have different intervals) to get the new value**。 And the PSS you get doesn't include Graphics.

## Method 4 Debug.getMemoryInfo

```yaml
Debug.MemoryInfo memoryInfo = new Debug.MemoryInfo();
    Debug.getMemoryInfo(memoryInfo);

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES. M) {
        String javaHeap = memoryInfo.getMemoryStat("summary.java-heap");
        String nativeHeap = memoryInfo.getMemoryStat("summary.native-heap");String code = memoryInfo.getMemoryStat("summary.code");
        String stack = memoryInfo.getMemoryStat("summary.stack");
        String graphics = memoryInfo.getMemoryStat("summary.graphics");
        String privateOther = memoryInfo.getMemoryStat("summary.private-other");
        String system = memoryInfo.getMemoryStat("summary.system");           
        String swap = memoryInfo.getMemoryStat("summary.total-swap");
    }
```

Advantages: PSS is obtained, and there is no frequency limit, and the components of PSS can be obtained

Cons: The acquired PSS does not include Graphics. Android below 6 does not allow you to get the occupied memory of a component through the Debug.MemoryInfo.getmemoryStat interface, but only through the reflection method

# Get the memory information of the phone

1. View the memory usage information

Adb shell free

<img src="/assets/G9b6bJo9loEBigxjgkQcaQxVnyh.png" src-width="684" class="m-auto" src-height="97" align="center"/>

1. View the memory usage details

Adb shell cat /proc/meminfo

<img src="/assets/ZLwMb3sLjoSlXQxbbRecoQ03nzc.png" src-width="522" class="m-auto" src-height="377" align="center"/>