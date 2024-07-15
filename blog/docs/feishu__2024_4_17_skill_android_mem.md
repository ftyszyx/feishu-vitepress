---
create_time: 1715931285
title: android_mem
categories:
  - skill
---


以android stuiod profiler主准

# profiler使用：

参考：https://blog.csdn.net/Calvin_zhou/article/details/119681272

依次选择 **View &gt; Tool Windows &gt; Profiler** 或点击工具栏中的 Profile图标

<img src="/assets/UTjKb2ykyod7sXxAdUvcWXZ6nCh.png" src-width="827" class="markdown-img m-auto" src-height="330" align="center"/>

点击 MEMORY 时间轴上的任意位置以打开内存性能分析器

<img src="/assets/RC52bj5IQo6GyJxCXNEc4dLHnZb.png" src-width="809" class="markdown-img m-auto" src-height="372" align="center"/>

内存分类：

Java：从 Java 或 Kotlin 代码分配的对象的内存

Native：从 C 或 C++ 代码分配的对象的内存

Graphics：图形缓冲区队列为向屏幕显示像素（包括 GL 表面、GL 纹理等等）所使用的内存

Stack：您的应用中的原生堆栈和 Java 堆栈使用的内存。这通常与您的应用运行多少线程有关

Code：您的应用用于处理代码和资源（如 dex 字节码、经过优化或编译的 dex 代码、.so 库和字体）的内存

Others：您的应用使用的系统不确定如何分类的内存

Allocated：您的应用分配的 Java/Kotlin 对象数。此数字没有计入 C 或 C++ 中分配的对象

#  获取应用实际内存占用

https://zhuanlan.zhihu.com/p/372883142

**一般使用pss作为内存性能指标，使用方法 3**

VSS - Virtual Set Size 虚拟耗用内存（包含共享库占用的内存）

RSS - Resident Set Size 实际使用物理内存（包含共享库占用的内存）

PSS - Proportional Set Size 实际使用的物理内存（比例分配共享库占用的内存）假如有3个进程使用同一个共享库，那么每个进程的PSS就包括了1/3大小的共享库内存。通常我们使用PSS大小来作为内存性能指标。

USS - Unique Set Size 进程独自占用的物理内存（不包含共享库占用的内存） 

一般来说内存占用大小有如下规律：VSS &gt;= RSS &gt;= PSS &gt;= USS

## 方法 1 adb

1. adb shell

<img src="/assets/ZfYzb7Sr8ogO7VxwcXGcIPufnTh.png" src-width="279" class="markdown-img" src-height="61"/>

1. top

<img src="/assets/A2mYbmbujoDNLMxWaRjck16DnOd.png" src-width="287" class="markdown-img" src-height="58"/>

1. 根据包名查看pid

<img src="/assets/Mq8xbYQvnouhJExX6uUcyekwnmd.png" src-width="821" class="markdown-img m-auto" src-height="138" align="center"/>

1. adb shell dumpsys meminfo 包名或者进程id

```yaml
adb shell dumpsys meminfo com.tencent.mobileqq:mini3
```

<img src="/assets/ArlTbW8o6oi9ENx6kR9cVK4Bnac.png" src-width="1064" class="markdown-img m-auto" src-height="846" align="center"/>

1. 如果想查看一个app的所有进程的内存开销

使用命令 adb shell dumpsys meminfo | findstr 包名 （win10  cmd），如图可以知道qq有哪些进程以及相应进程的内存占用。

<img src="/assets/IhYJbTo8coD5qyxEYSCcINL2nNQ.png" src-width="756" class="markdown-img" src-height="210"/>

 

## 方法2 pid status

"/proc/" + android.os.Process.myPid() + "/status" 路径文件里的信息获取。

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
                if(!TextUtils.isEmpty(line) && line.contains("VmRSS")) {
                    String rss = line.split(":")[1].trim().split( " ")[0];
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

优点：暂时没有权限限制，实时获取

缺点：这种读文件的方法拿到的内存是RSS。我们通常期望获取的是PSS

RSS和PSS 的区别：

RSS - Resident Set Size 实际使用物理内存（包含共享库占用的内存）

PSS - Proportional Set Size 实际使用的物理内存（比例分配共享库占用的内存）假如有3个进程使用同一个共享库，那么每个进程的PSS就包括了1/3大小的共享库内存。通常我们使用PSS大小来作为内存性能指标。

##  方法3 ActivityManager(PSS)

```yaml
ActivityManager activityManager = (ActivityManager) getSystemService(Context.ACTIVITY_SERVICE);
                final Debug.MemoryInfo[] memInfo = activityManager.getProcessMemoryInfo(new int[]{android.os.Process.myPid()});
final int totalPss = memInfo[0].getTotalPss();
```

优点：获取的是PSS

缺点：安卓P以上限制频率，**需要隔约5分钟（不同手机间隔不同）才能获取到新的值**。而且获取的 PSS 不包括 Graphics。

## 方法4 Debug.getMemoryInfo

```yaml
Debug.MemoryInfo memoryInfo = new Debug.MemoryInfo();
    Debug.getMemoryInfo(memoryInfo);

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        String javaHeap = memoryInfo.getMemoryStat("summary.java-heap");
        String nativeHeap = memoryInfo.getMemoryStat("summary.native-heap");
        String code = memoryInfo.getMemoryStat("summary.code");
        String stack = memoryInfo.getMemoryStat("summary.stack");
        String graphics = memoryInfo.getMemoryStat("summary.graphics");
        String privateOther = memoryInfo.getMemoryStat("summary.private-other");
        String system = memoryInfo.getMemoryStat("summary.system");           
        String swap = memoryInfo.getMemoryStat("summary.total-swap");
    }
```

优点：获取的是PSS，并且没有限频，可以获取到 PSS 的组成部分

缺点：获取的 PSS 不包括 Graphics。Android 6 以下不能通过 Debug.MemoryInfo.getmemoryStat 接口获取组成部分的占用内存，只能通过反射方法获取

# 获取手机内存信息

1. 查看内存占用信息

Adb shell free

<img src="/assets/G9b6bJo9loEBigxjgkQcaQxVnyh.png" src-width="684" class="markdown-img m-auto" src-height="97" align="center"/>

1. 查看内存占用详情

Adb shell cat /proc/meminfo

<img src="/assets/ZLwMb3sLjoSlXQxbbRecoQ03nzc.png" src-width="522" class="markdown-img m-auto" src-height="377" align="center"/>

