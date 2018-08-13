# FrontEndART SourceMeter plug-in for SONARQUBE™ platform

*FrontEndART* **[SourceMeter]** is a command line source code analyzer tool, which can perform **deep static analysis** of the source code of complex software systems written in **C/C++**, **C#**, **Java**, **Python**, and **RPG**. [FrontEndART] offers a **free version** of SourceMeter.

*SourceMeter plug-in for SONARQUBE™ platform* ("plug-in" in the following) is an extension of the open-source [SONARQUBE]™ platform ("platform" in the following) for managing code quality. The plug-in executes SourceMeter from the platform and uploads the source code analysis results of SourceMeter into the platform's database.

The plug-in is free and open-source, and provides all the usual platform code analysis results, extended with many additional metrics and issue detectors provided by the SourceMeter tool.

Additionally, the plug-in extends the platform's GUI with a SourceMeter dashboard view.

***Highlights*** of the added features:

- Precise C/C++, C#, Java, Python, and RPG source code analysis engines

- Package, class and method level analyses extending the directory and file-based approach

- More sophisticated syntax-based duplicated code detection engine (Type-2 clones)

- Additional and more precise source code metrics (100+) including metrics related to clones

- Powerful coding issue detection

- Custom dashboard for packages, classes, methods and clone classes/instances

- And many more...

The plug-in is compatible with the latest version 6.7[^1] of the platform, which can be obtained from its [website].

[SONARQUBE]™ is a trademark of [SonarSource] SA, Switzerland.

[SourceMeter]:https://www.sourcemeter.com/
[FrontEndART]:https://www.frontendart.com/
[SONARQUBE]:http://www.sonarqube.org/
[website]:http://www.sonarqube.org/downloads
[SonarSource]:http://www.sonarsource.com/

# System Requirements and Installation

## Plug-in installation

Before starting with the installation of the plug-in, make sure that you have a successfully completed the installation of [SourceMeter] and the [platform].

[platform]:http://docs.sonarqube.org/display/SONAR/Setup+and+Upgrade

The installation of the plug-in is as simple as copying the `sourcemeter-gui-plugin-1.0.0.jar` and `sourcemeter-core-plugin-1.0.0.jar` files and the corresponding language analyzer plugins into the destination folder `extensions/plugins` of the platform installation:

- C/C++: `sourcemeter-analyzer-cpp-plugin-1.0.0.jar`
- C#: `sourcemeter-analyzer-csharp-plugin-1.0.0.jar`
- Java: `sourcemeter-analyzer-java-plugin-1.0.0.jar`
- Python: `sourcemeter-analyzer-python-plugin-1.0.0.jar`
- RPG: `sourcemeter-analyzer-rpg-plugin-1.0.0.jar`

Since there is an independent sensor plug-in for each language, it is enough to install (copy to the destination folder) the sensor plug-in(s) of the required language(s).

Please make sure to complete the following additional steps:

1.  Restart the web server which hosts the platform for the new plug-in to come into effect. (For instance, in the case of an installation on Linux, the necessary command is `bin/linux-x86-64/sonar.sh restart` in the installation directory.)

2.  On the *Settings* page (see screenshot below) select the SourceMeter category and set the installation directory of the SourceMeter command line tool (*SourceMeter location*) and a directory (*Results directory*) for storing the results of the analysis (which is, by default, a directory called `results` in the project directory).

3.  On the *Quality Profiles* page set as default the *SourceMeter way* for each language required to be analyzed by SourceMeter.

4.  In case of Python make sure that the Python2.7 binary path is set with `sm.python.binary` property or in the *SourceMeter Python Settings* page.

5.  If the code analysis is to be performed on an other machine than the platform server's machine, the steps for configuring remote analysis should be followed in Section [Performing the analysis remotely](#performing-the-analysis-remotely) of this manual.

![](img/sm-settings-general.png)

Since an arbitrary number of different projects can be monitored and for the proper project evaluation it is important to know which analyzers were executed for the given project, there is a summary table at the bottom of the SourceMeter Dashboard which provides this information to the user (see screenshot below). More precisely, for each language analyzed by SourceMeter there is a row in the table where precise information about the execution of the different analyzer components can be found (for more details read the SourceMeter User's Guide):

- Analyzers executed with full functionality can be found in the *Full functionality* column (green).
- Analyzers that were available only with limited functionality are listed in the *Limited functionality* column (yellow).
- *Not executed* column contains those analyzers that are part of the SourceMeter toolchain but were not executed (red) for some reason (e.g. because of a missing commercial license for SourceMeter).

![](img/sm-execution-table.png)

## Plug-in uninstallation

To uninstall the plug-in, first delete the *SourceMeter way* quality profile and then remove the installed plug-in files (`sourcemeter-*-plugin-1.0.0.jar`)  from the folder `/extensions/plugins`.

# Code Analysis

The [code analysis procedure] has to be initiated by using the platform in the usual way. The analysis can be performed in various ways including the built-in Scanner, as an Ant Task, Maven or Gradle process, or using various CI engines including Jenkins, Hudson, Atlassian Bamboo, Apache Continuum, CruiseControl and Jetbrains TeamCity.

[code analysis procedure]:http://docs.sonarqube.org/display/SONAR/Analyzing+Source+Code

It is possible to configure the analysis for a single project only or for projects with multiple modules, in each case SourceMeter will be invoked properly. The actual configuration depends on the applied analysis process. Please refer to the corresponding platform documentation for details.

### Code Analysis: C/C++

SourceMeter is able to analyze compilable C/C++ projects only and it requires a build script which contains how to build the project (for more details read SourceMeter C/C++ User's Guide). This means that besides other common mandatory properties, `sm.cpp.buildfile` property must be set to the build file of the C/C++ project. For example, if the build file is `build.sh` and can be found next to the `sonar-project.properties` file the following line has to be inserted into it:

    sm.cpp.buildfile=build.sh

### Code Analysis: C\#

SourceMeter is able to analyze a single C# source file or C# project, compilable with C# 6.0 and can be built with MSBuild on Windows. In both cases `sm.csharp.input` property must be set to the Visual Studio solution (.sln) or project (.csproj) file of the project to be analyzed or to the C# source file. In case of project analysis, the  project configuration and platform must be given as well. For example, if we want to analyze a project in `Debug` configuration to `AnyCPU` platform where the solution file is `Example.sln` and can be found next to the `sonar-project.properties` file the following lines have to be inserted into it:

    sm.csharp.input=Example.sln
    sm.csharp.configuration=Debug
    sm.csharp.platform=AnyCPU

### Code Analysis: Java

SourceMeter is able to analyze incomplete source code without 3^rd^ party libraries as well, but for providing precise results the analyzed system must be complete and all external references must be available. The platform provides the `sonar.libraries` setting key to provide the 3^rd^ party libraries and SourceMeter uses this parameter as well.

### Code Analysis: Python
SourceMeter can analyze source code conforming to Python 2.7.8 and earlier versions.
It is sufficient to set the source directory of the project to be analyzed.
The results will be created regardless of the possible import errors of the Python modules, but for providing precise results the analyzed system must be complete and all external references must be available.

### Code Analysis: RPG
SourceMeter can analyze source code conforming to RPG III and RPG IV versions (including free-form as well). Two kinds of inputs are supported: It can be specified either as raw source code or as compiler listing. In case of using raw source code as input, the analyzer might not be able to calculate some code metrics or detect various rule violations because the raw source contains less information than the compiler listing. For instance, cross references are detected with the help of compiler listing entries. So, it is highly recommended to use compiler listings as input to get fully detailed analysis results. For constructing RPG compiler listing files, use the RPG compiler version V6R1M0. 

## Settings

After logging in with administrator rights, the plug-in and SourceMeter can be customized by using various settings:

- Settings on *General settings* page (under *Administration*) are global which means that these settings are taken into account at every analysis so changing them will influence all further measurements.
- If there is a project which requires customized analysis, its settings can be changed on the project dependent setting pages[^2] (under *Administration* menu of a given project) where almost all settings are available except thresholds and *Clean SourceMeter Results Directory*, *Results directory* and *SourceMeter location*. If a setting is given on the *General Settings* and on project dependent *Settings* page as well, the project dependent one will be used.
- All settings can be given in the appropriate `sonar-project.properties` file as well (the corresponding keys are presented for each setting). If a setting is given on the setting pages and at the same time in property file as well, the value given in the property file will be used.

The following parameters are supported:

- Common parameters (*SourceMeter* setting page, see screenshot above in Section [Plug-in installation])
    - **Clean SourceMeter Results Directory:** SourceMeter puts the analysis results (and log files and some other files) into time stamped directories. This means that an arbitrary number of analysis results can be preserved, but in practice this is not necessary and after a while it might consume too much space. By using *Clean SourceMeter Results Directory* we can set how many analysis results we want to keep and older results will be deleted (see -cleanResults parameter of SourceMeter). Key: `sm.cleanresults`
    - **Clone Genealogy:** Similarly to source code elements, Clone Classes and Clone Instances have history as well and SourceMeter is able to recognize if a given Clone Instance existed in the previous version even if it changed so it is able to calculate, for example, its age (see Clone Age metric). On the other hand, in some cases this tracking process requires more memory and runs for a longer time so it can be turned off by the *Clone Genealogy* setting (see -cloneGenealogy parameter of SourceMeter). Key: `sm.cloneGenealogy`
    - **Clone min. lines:** SourceMeter code duplication detector searches for similar code parts which consist of at least *n* lines where this minimum lines parameter can be changed by *Clone min. lines* setting (see -cloneMinLines parameter of SourceMeter). Key: `sm.cloneMinLines`
    - **Results directory:** This setting can be used to specify where the analysis result files will be created (see -resultsDir parameter of SourceMeter). Key: `sm.resultsdir`
    - **Upload all metrics:** SourceMeter calculates lots of metrics but uploading all of them may cause longer analysis time and dashboard display time therefore by default the plug-in uploads only the most essential ones. By turning this setting on (true), all calculated metrics are uploaded. Key: `sm.uploadAllMetrics`
    - **SourceMeter location:** The plug-in uses the SourceMeter command line toolchain as an external tool so the user has to set the SourceMeter installation directory by the *SourceMeter location* setting. Key: `sm.toolchaindir`

- C/C++ parameters (*SourceMeter C/C++* setting page, see screenshot below)
    - **Source files suffixes:** It is possible to give a set of file name extensions which determines which files are considered as C/C++ source files. Although SourceMeter for C/C++ does not use this information, the platform uses it to find out the languages of a project if it is not specified with the sonar.language property. Key: `sm.cpp.suffixes.sources`
    - **Header files suffixes:** It is possible to give a set of file name extensions which determines which files are considered as C/C++ header files. Although SourceMeter for C/C++ does not use this information, the platform uses it to find out the languages of a project if it is not specified with the sonar.language property. Key: `sm.cpp.suffixes.headers`
    - **Hard filter:** SourceMeter for C/C++ provides two different ways for filtering out such parts of the project that are out of interest (for example, generated code or unit tests). The plug-in takes into account exclusions and inclusions given on the *Analysis Scope* page (and it is passed to SourceMeter as externalSoftFilter) but it allows the user to give *Hard filter* as well which will be passed to SourceMeter externalHardFilter parameter. Before starting using *Hard filter*, read the description of externalHardFilter parameter of SourceMeter for C/C++. Key: `sm.cpp.hardFilter`

![](img/sm-settings-cpp.png)

- C# parameters (*SourceMeter C#* setting page)
    - **Configuration:** The name of the project configuration. Key: `sm.csharp.configuration`
    - **FxCop location:** SourceMeter for C# uses FxCop but it is not part of SourceMeter command line toolchain so it is possible to specify the directory which contains the FxCop binaries. If not provided, SourceMeter toolchain will search through the installed Visual Studio directories and use the latest one if found. Key: `sm.csharp.fxCopPath`
    - **Hard filter:** SourceMeter for C# provides two different ways for filtering out such parts of the project that are out of interest (for example, generated code or unit tests). The plug-in takes into account exclusions and inclusions given on the *Exclusions* page (and it is passed to SourceMeter as externalSoftFilter) but it allows the user to give *Hard filter* as well which will be passed to SourceMeter externalHardFilter parameter. Before starting using *Hard filter*, read the description of externalHardFilter parameter of SourceMeter for C#. Key: `sm.csharp.hardFilter`
    - **Platform:** The name of the target platform. Key: `sm.csharp.platform`
    - **Run FxCop:** Since FxCop is not part of SourceMeter toolchain and it is able to run only if there was a successful build of the given project and pdb files were generated, it is possible to turn on or off the FxCop coding rule violation checking. Key: `sm.csharp.runFxCop`

- Java parameters (*SourceMeter Java* setting page)
    - **Hard filter:** SourceMeter for Java provides two different ways for filtering out such parts of the project that are out of interest (for example, generated code or unit tests). The plug-in takes into account exclusions and inclusions given on *Exclusions* page (and it is passed to SourceMeter as externalSoftFilter) but it allows the user to give *Hard filter* as well which will be passed to SourceMeter externalHardFilter parameter. Before starting using *Hard filter*, read the description of externalHardFilter parameter of SourceMeter for Java. Key: `sm.java.hardFilter`
    - **JVM max memory:** Some command line tools of SourceMeter for Java are written in Java and to improve their performance *JVM max memory* parameter can be used to set the maximum memory usage of the Java Virtual Machine (see -JVMOptions parameter of SourceMeter for Java). The value is given in MegaBytes. Key: `sm.java.maxMem`
    - **Max depth for VulnerabilityHunter:** The maximal searching depth parameter of VulnerabilityHunter can be set by the *Max depth* parameter (see -VHMaxDepth parameter of SourceMeter for Java). Key: `sm.java.vhMaxDepth`
    - **Run RTEHunter:** Since the execution time of RTEHunter can be long on larger projects, the plug-in provides a possibility for the user to turn it off by the *Run RTEHunter* option. Key: `sm.java.runRTEHunter`
    - **Run VulnerabilityHunter:** Since the execution of VulnerabilityHunter can take a long time on larger projects, the plug-in provides a possibility for the user to turn it off by the *Run VulnerabilityHunter* option. Key: `sm.java.runVulnerabilityHunter`
    - **State number limit of RTEHunter:** Sets the maximum number of states for the RTEHunter module. (The default value is 500.) Key: `sm.java.RHMaxState`
    - **State tree depth limit of RTEHunter:** Sets the maximum depth limit of states in the RTEHunter module. (The default value is 200.) Key: `sm.java.RHMaxDepth`
    - **Timeout for VulnerabilityHunter:** *Timeout for VulnerabilityHunter* parameter allows to set the timeout for the VulnerabilityHunter module in minutes (see -VHTimeOut parameter of SourceMeter for Java). Key: `sm.java.vhTimeOut`

- Python parameters (*SourceMeter Python* setting page)
    - **Python 2.7 binary:** The path of Python 2.7 binary. Key: `sm.python.binary`

- RPG parameters (*SourceMeter RPG* setting page)
    - **RPG3 pattern:** File name pattern for RPG/400 files. Key: `sm.rpg.rpg3Pattern`
    - **RPG4 pattern:** File name pattern for ILE RPG files. Key: `sm.rpg.rpg4Pattern`
    - **Spool pattern:** File name pattern for spool (compiler listing) files. (E.g. ".*\\.txt") Key: `sm.rpg.rpg4Pattern`

- Threshold pages (for all supported languages) allow to change the thresholds of all metrical values calculated by SourceMeter (see screenshot below). By default all metrics have a predefined value except the ones that cannot be characterized with an absolute value (for example, comment lines of a class). Since there are different kinds of source code elements (Class, Method, Program, Procedure, Subroutine, Clone), threshold pages are organized according to them and furthermore, there are many sections within each setting page.

![](img/sm-settings-thresholds.png)

The following options can be set only in the configuration file (they are not available on the setting pages because they are not necessary during ordinary usage):

- **Linking mode:** SourceMeter for C/C++ "simulates" the original build steps but it offers different modes for linking and the plug-in allows the users to change it. The different modes are described in SourceMeter C/C++ User's Guide. Key: `sm.cpp.linkingMode`

- **Omitting uploading methods:** The plug-in extracts over *10 times more information* from the source code than the original platform analyzer does resulting in an increased memory usage and run time on the server side. On average, both increase typically by a factor of 3-5. For very large projects the run time of the data uploading on the server side might become extremely large. To speed up the analysis, the plug-in provides a simplified analysis mode where the methods and the method level results are not but all other results are uploaded. This can be activated by setting the value of `sm.{language key}.uploadMethods` key to false in the property file of the project (where `language key` can be `cpp`, `csharp`, `java`, `python` or `rpg`). For example, if Scanner is used for the analysis, the  `sonar-project.properties` file of the project directory has to be extended with the following line:

        sm.java.uploadMethods=false

    Besides, due to the increased amount of uploaded data, the size of the database usually increases by a factor of 3-5. In order to avoid running out of disk space, it is highly recommended to configure your database server to recover disk space occupied by deleted records. For example, in case of PostgreSQL, the autovacuum feature should be turned on ([http://www.postgresql.org/docs/9.4/static/runtime-config-autovacuum.html]).

[http://www.postgresql.org/docs/9.4/static/runtime-config-autovacuum.html]:http://www.postgresql.org/docs/9.4/static/runtime-config-autovacuum.html


## Performing the analysis remotely

Similarly to other analyzer engines, the plug-in can also be [configured] to be executed on a remote machine other than the platform server's machine. This has the advantage of balancing the resources required for the analysis and for storing and displaying the results. In this case, the SourceMeter tool must be installed on the remote machine following these steps:

[configured]:http://docs.sonarqube.org/display/SONAR/Installing

1. Install SourceMeter (as described in SourceMeter User's Guide) to the desired location on the remote machine. Make sure SourceMeter package matches with the architecture of the remote machine and it meets all requirements.

2. Set the directory where SourceMeter is installed on the remote machine (`sm.toolchaindir`) and the directory where the results of the analysis are stored on the remote machine (`sm.resultsdir`).

    - These two properties can be set under General Settings on the SourceMeter category page by setting the *SourceMeter location* and *Results directory* (see the screenshot above). In this case these settings will be applied for all projects unless a given project overwrites them (see below).

    - To specify it only for a given project, these properties have to be set in the property file of the project. For example, if Scanner is used for the analysis, either the `<platform home>/conf/sonar-scanner.properties` file or the `sonar-project.properties` file of the project directory has to be extended with the following lines:


            sm.toolchaindir=<path_to_sourcemeter>
            sm.resultsdir=<path_to_results_dir>

        For example:

            sm.toolchaindir=/home/other/SourceMeter
            sm.resultsdir=/home/other/example_prj/Results

Note, that if the analysis is transferred to a separate machine after some analysis data are already available, the results directory with its content should also be transferred. Otherwise, those metrics computed by the plug-in that rely on previous analysis results will not be accurate.

# Features

The plug-in boosts the platform GUI in various ways. In this section we overview these new features.

## SourceMeter Help

The SourceMeter and the plug-in User's Guides are available under the *More* menu on the main dashboard (see screenshot below).

![](img/sm-help.png)

## SourceMeter Dashboard

After selecting a project, the SourceMeter Dashboard is available under the *More* menu of the project menubar (see screenshot below).
On the dashboard there are four widgets which present the results of the SourceMeter analysis:

- Package/Namespace widget shows the packages and namespaces and their metric values.
- Class widget shows the classes, interfaces, structs, unions, and enums and their metric values.
- Method widget shows the methods and functions and their metric values.
- Clone class widget shows the clone classes and clone instances and their metric values.

![](img/sm-dashboard.png)

### Widgets

On each widget, there is a table that presents the elements in the rows. In each row, the first column is the name of the element and the further columns show the metric values (except for Clone class widget which is described in Section [Clone Class Widget]). The metrics can have one of the following three colors: red means that the metric violates the preset threshold, while green shows that the value is right; finally, those metrics that do not naturally have a threshold value are shown in black. (The threshold values can be set on the [Settings] page.) Hovering over a metric name shows its description in an information bubble, clicking on the metric name orders the dataset according to that metrics value. Smaller values are shown first. Clicking again sorts the dataset in reverse order. The arrow appearing next to the column header name indicates the direction of ordering.

**Number of rows** limits how many rows the table shows on one page. The **arrow buttons** can be used to move forward or backward among the pages. The dataset can be filtered by the name of the elements using the **Filter** (where the filtering is case-insensitive). The columns can also be filtered by their names using the **Column filter**[^3]. Clicking on the name of a class or method level element opens the source-code of that element in a new popup-window and it will be highlighted. (In order to use this feature you have to allow popup windows on the page for your Browser.)

## Clone Class Widget

SourceMeter has a sophisticated Type-2 clone detection engine (detects syntactically identical source code fragments except for variations in identifier names, literals, type references, whitespace, layout, and comments) where the plug-in takes into account the syntactic structure of the source code; hence no broken code fragments without syntactic structure will be reported.


The *Clone class* widget is very similar to the other widgets but there is no *Column filter* because there are only a few columns for clone classes and clone instances. Besides, the table is different as well. Alhouth the first columns (the name of the clone class and its metric values) are the same, the second part of each row is split up into the clone intances belonging to the given clone class and their metrics. Due to this construction, the data in this table can be ordered by clone class and clone class metrics only. Clicking on a clone instance will open up a source-code browser in a popup similar to the other widgets, highlighting the starting line of the clone-instance. Since the results of the platform's built-in clone detector cannot be overwritten, **the clone instance detected by SourceMeter cannot be browsed in the platform's way**.

## Original Dashboard

The original platform Dashboard is not changed by the plug-in and can be used in the usual way. Even more, the metric values on this dashboard do not change as well except those ones that are related to coding issues because they are calculated based on the SourceMeter results.[^3]


## Issues Drilldown

This page is essentially not modified, but the plug-in includes powerful new coding issue detection:

- In case of Java, [OWASP] vulnerability issues will be reported as issues falling in the *Blocker* severity category (VulnerabilityHunter module of SourceMeter for Java; license key is required). Opposed to other general coding rule violations where one source position is enough for showing the problem, vulnerability issues reveal a possible execution path from a source to a given sink, which means that the developer needs the trace for understanding the problem and fixing the issue. Therefore, the whole trace, which describes the possible execution path from the source to the sink, is also available at the warning (see screenshot below).
- RunTimeExceptions issues (RTEHunter module of SourceMeter for Java; license key is required) are similar to vulnerability ones, namely they belong to the *Blocker* category and the issue does not only point to a given source position where they Exception occurs but a trace is also presented which show what leads to the given Exception.
- FaultHunter modules of SourceMeter for all languages except C# (license key is required) are common programming mistakes detectors, which re-implement some rules of free checkers and provide less noise (false positives) and a number of real problems not available in the corresponding free checkers (true negatives).
- Although free common programming mistakes detectors are available for C/C++, C#, Java and Python, their biggest drawbacks are that there are many useless or too noisy rules. SourceMeter not only integrates the best of these (PMD and FindBugs for Java, CppCheck for C/C++, FxCop for C#, and PyLint for Python)[^4] but the rules have been carefully selected and reprioritized by software developer and QA experts. For these rules the plug-in uses the *Minor*, *Major*, *Critical* and *Blocker* categories. If a valid SourceMeter FaultHunter license key is available, then the reimplemented rules of the free programs will be switched off automatically and FaultHunter will provide the results instead. If no license key is available (free version), then the results of the integrated free checkers will be used.
- All metrics that violate the preset threshold values[^5] will be reported as new issues (coding rule violations) falling in the *Info* severity category. This will enable its use in various statistics, drilldown and source code view, for instance. (In case of C/C++ and RPG languages, the free version of SourceMeter provides a limited number of metrics and metric based rule violations. To access all metrics, a license key is required.)

[OWASP]:https://www.owasp.org

![](img/sm-issue-with-trace.png)

Another difference comes from the fact that different tools integrated into SourceMeter (for example, PMD, FindBugs, FaultHunter for Java) are able to detect the same coding issues (for example, *Missing Break In Switch*) but in this case SourceMeter presents only the most accurate result. This means that for each rule there is a predefined priority in SourceMeter which determines which issue detector tool should be used first, second, etc. and the issues are presented based on this priority.

![](img/sm-multiple-issue-description.png)

# Differences with the platform

Here we list the main differences with the built-in platform analysis in addition to the provided benefits listed in the previous sections.

- Classes, stucts, unions, enums, interfaces and annotations are commonly treated as classes by the plug-in to simplify the GUI. (SourceMeter itself is able to differentiate them.)

- During source code analysis both the platform's built-in analyzer and the plug-in analyzer are executed for compatibility reasons: first, the built-in one is executed which is followed by the plug-in. The plug-in uploads the the coding issues calculated by SourceMeter but all other type of results (e.g. source code metrics, duplications, coverage) are not changed on the platform's dashboards. The metric values calculated by SourceMeter is available on the [SourceMeter Dashboard].

- Some metrics computed by the plug-in rely on the results of previous analyses (e.g. clone age).

- The plug-in provides more metrics than the built-in ones.

# Known bugs and deficiencies

Known bugs and deficiencies of the plug-in.

- The plug-in places the results into the directory specified by the `sonar.projectKey` property. If special characters (like '\<', '\>', etc.) are used in the parameter, the analysis will probably fail.

- Based on the project configuration and the exclusion options the plug-in creates a special filter file and SourceMeter considers it during the analysis. Since the plug-in and SourceMeter handle the symbolic links differently, the result might be incomplete or empty.

- The platform's [issues workflow] helps users to manage the issues, which means that the users can perform several different *tasks on them* (e.g. writing a comment or assigning them to somebody). The platform recognizes those issues that already existed in the previous analyzed version and their *task settings* will be available in the next versions as well. SourceMeter FaultHunter module replaces many rule violations of the free checkers with its own implementation (or vice versa if, for example, the license key expires) but it hides this change from the platform, more precisely, the platform does not notice the difference and the *task settings* of an issue reported by one checker will be available on the corresponding issue reported by another checker. However, in some cases, the different implementations of the same rule differ so much that it is not possible to hide this change, and in these cases the *task settings* on the given issue might get lost or goes to a wrong place. For example, in case of *Missing Brake In Switch* rule FaultHunter warns for each branch where the break (or continue, etc.) is missing while PMD gives only one warning for the line of the switch keyword. In this case, it is possible that FaultHunter provides more rule violations instead of the earlier one and the *task settings* cannot be transferred automatically to all of them.

- TODO: Although the different kinds of C and C++ elements have different sets of metrics (e.g. C++ struct has inheritance metrics while C struct does not) their coding rule violation groups are common in spite of the fact that several category (e.g. Object Orientedness) cannot be applied for C elements.

- In case of C/C++ and Python, SourceMeter calculates metrics for declarations and the definition separately. The plug-in uploads only the metric values of the definition (if it exists) or the first declaration (if there is no definition in the code). This can lead to imprecisions in some cases.

[issues workflow]:http://docs.sonarqube.org/display/SONAR/Issues

# FAQ

Frequently Asked Questions regarding the plug-in.

- Problem: After installing the SourceMeter plug-in it does not work.
    
    Solution: Check if the necessary installation steps have been carried out properly (see Section "Plug-in installation"):

    - Check whether the installation package corresponds to the host operating system.

    - Check whether the plug-in supports your platform version. 

    - Check whether the plug-in is copied to the proper folder.

    - Check the settings on the *Administration\>SourceMeter* page.

    - Check whether the SourceMeter way is set as the default.

-  Problem: After installing or reinstalling the plug-in, the SourceMeter way profile does not appear on the Quality Profiles page or it appears but its number of rules is zero or the rules are not up-to-date.

    Solution: On the Quality Profiles page use the *Restore Built-in Profiles* option.

- Problem: The plug-in does not offer exclusions on the SourceMeter Settings page (in the General Settings), and only HardFilter is available.

    Solution: SourceMeter uses the built-in filter set in the *Analysis Scope* page. (Although HardFilter is a kind of filter, it has different behavior, so use it carefully. For more details, see SourceMeter User's Guide.)

- Problem: Although there is enough RAM in the computer, the Scanner and the plug-in do not use all of it and they run too slowly or fail with OutOfMemory exception.

    Solution: The user can set the maximum memory usage of the Scanner with the `SONAR_SCANNER_OPTS` variable. (E.g.: export `SONAR_SCANNER_OPTS=-Xmx16G`)

- Problem: During the analysis the execution time of the VulnerabilityHunter module is too large.

    Solution: The execution time of the VulnerabilityHunter module can be controlled by two settings (*Max depth for VulnerabilityHunter* and *Timeout for VulnerabilityHunter*) or in the worst case it can be turned off (*Run VulnerabilityHunter*). For more detailes read Section [Settings].

- Problem: A Java, Python, or RPG project is analyzed but it fails and the error message says that the C/C++ build file must be given (*Build script path must be set! (sm.cpp.buildfile)*).

    Solution: The languages of the project are determined automatically based on file extensions and it might happen that there are also C/C++ source files in a Java, Python, or RPG project. If you do not have a build script for these files, or you are not interested in these, set the `sm.cpp.suffixes.sources` key to some invalid extension (e.g. `.never_used_extension`).

- Problem: The plug-in is installed but only those code duplications can be browsed in the source code view which were detected by the platform's built-in clone detector.

    Solution: Although SourceMeter finds code duplications in the source code and the plug-in uploads the results, these code duplications are available only on the SourceMeter Dashboard. (It is not possible replace the platform's analysis results.)

- Problem: Although the thresholds are set for the metrics all of them are black on the SourceMeter Dashboard.

    Solution: Sometimes the SourceMeter Dashboard is not reloaded properly. In this case, *force refresh* likely solves the problem.
