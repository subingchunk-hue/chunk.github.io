---
title: 实验报告——第一个HarmonyOS应用
date: 2025-09-08 15:00:00
tags: [小程序开发, 实验]
categories: [小程序]
---

#                2025年夏季《移动软件开发》实验报告

## 实验目标

1. 掌握如何构建 HarmonyOS应用；

2. 掌握应用程序包结构、资源文件的使用；

3. 掌握ArkTS的核心功能和语法等基础知识，为后续的应用开发奠定基础。

## 实验步骤

#### 工具准备

下载并安装最新版[DevEco Studio](https://developer.huawei.com/consumer/cn/download/)。

<img src="/chunk.github.io/images/屏幕截图 2025-09-08 130744.png" style="zoom:50%;" />

<img src="/chunk.github.io/images/屏幕截图 2025-09-08 133848.png" style="zoom:50%;" />

#### 创建ArkTS工程

1. 单击Create Project创建工程，选择Application应用开发，选择模板Empty Ability，单击Next进行配置；

   <img src="/chunk.github.io/images/屏幕截图 2025-09-08 133934.png" style="zoom:50%;" />

2. 进入配置工程界面，Compatible SDK选择5.1.1(19)，其他参数保持默认设置，单击Finish，等待工程创建完成。

   <img src="/chunk.github.io/images/屏幕截图 2025-09-08 134024.png" style="zoom:50%;" />

#### 构建第一个页面

1. 使用文本组件

   在`Project`窗口，单击`entry > src > main > ets > pages`，打开`Index.ets`文件，编辑代码，将页面相对布局修改成`Row/Column`线性布局。

   添加代码如下：

   ```ArkTS
   // Index.ets
   @Entry
   @Component
   struct Index {
     @State message: string = 'Hello World';		
     build() {
       Row() {
         Column() {
           Text(this.message)
             .fontSize(50)
             .fontWeight(FontWeight.Bold)
         }
         .width('100%')
       }
       .height('100%')
     }
   }
   ```

2. 添加按钮

   在默认页面基础上，添加`Button`组件，作为按钮响应用户`onClick`事件，从而实现跳转到另一个页面。

   添加代码如下：

   ```ArkTS
   // Index.ets
    @Entry
    @Component
    struct Index {
     @State message: string = 'Hello World';
     build() {
       Row() {
         Column() {
           Text(this.message)
             .fontSize(50)
             .fontWeight(FontWeight.Bold)
           // 添加按钮，以响应用户onClick事件
           Button() {
             Text('Next')
               .fontSize(30)
               .fontWeight(FontWeight.Bold)
           }
           .type(ButtonType.Capsule)
           .margin({
             top: 20
           })
           .backgroundColor('#0D9FFB')
           .width('40%')
           .height('5%')
         }
         .width('100%')
       }
       .height('100%')
     }
    }
   ```

3. 效果预览

   在编辑窗口右上角的侧边工具栏，单击Previewer，打开预览器进行预览。

   <img src="/chunk.github.io/images/屏幕截图 2025-09-08 134631.png" style="zoom:50%;" />

#### 构建第二个页面

1. 创建第二个页面

   - 在`Project`窗口，打开`entry > src > main > ets`，右键单击`pages`文件夹，选择 `New > ArkTS File`，命名为`Second`，单击回车键。

     <img src="/chunk.github.io/images/屏幕截图 2025-09-08 134727.png" style="zoom:50%;" />

   - 在`Project`窗口，打开`entry > src > main > resources > base > profile`，在 `main_pages.json`文件中的`"src"`下配置第二个页面的路由`"pages/Second"`。

     代码如下：

     ```ArkTS
     {
      "src": [
      "pages/Index",
      "pages/Second"
      ]
     }
     ```

     <img src="/chunk.github.io/images/屏幕截图 2025-09-08 134908.png" style="zoom:50%;" />

2. 添加文本及按钮

   参照第一个页面，为第二个页面添加`Text、button`等组件，在`Second.ets`中添加以下代码：

   ```ArkTS
   // Second.ets
    @Entry
    @Component
    struct Second {
    @State message: string = 'Hi there';
    build() {
    Row() {
    Column() {
    Text(this.message)
    .fontSize(50)
    .fontWeight(FontWeight.Bold)
    Button() {
    Text('Back')
    .fontSize(30)
    .fontWeight(FontWeight.Bold)
    }
    .type(ButtonType.Capsule)
    .margin({
        top: 20
           })
           .backgroundColor('#0D9FFB')
           .width('40%')
           .height('5%')
         }
         .width('100%')
       }
       .height('100%')
     }
    }
   ```

3. 效果预览

   点击右侧Previewer开始预览

<img src="/chunk.github.io/images/屏幕截图 2025-09-08 135041.png" style="zoom:50%;" />

#### 实现页面间跳转

1. 第一个页面跳转到第二个页面

   在第一个页面中，跳转按钮绑定`onClick`事件，单击按钮时跳转到第二页。

   ```ArkTS
   // Index.ets
    import { BusinessError } from '@kit.BasicServicesKit';
    @Entry
    @Component
    struct Index {
     @State message: string = 'Hello World';
     build() {
       Row() {
         Column() {
           Text(this.message)
             .fontSize(50)
             .fontWeight(FontWeight.Bold)
           // 添加按钮，以响应用户onClick事件
           Button() {
             Text('Next')
               .fontSize(30)
               .fontWeight(FontWeight.Bold)
           }
           .type(ButtonType.Capsule)
           .margin({
             top: 20
           })
           .backgroundColor('#0D9FFB')
           .width('40%')
           .height('5%')
           // 跳转按钮绑定onClick事件，单击时跳转到第二页
           .onClick(() => {
             console.info(`Succeeded in clicking the 'Next' button.`)
           // 获取UIContext
             let uiContext: UIContext = this.getUIContext();
             let router = uiContext.getRouter();
             // 跳转到第二页
             router.pushUrl({ url: 'pages/Second' }).then(() => {
               console.info('Succeeded in jumping to the second page.')
             }).catch((err: BusinessError) => {
               console.error(`Failed to jump to the second page. Code is ${err.code}, 
   message is ${err.message}`)
             })
           })
         }
         .width('100%')
       }
       .height('100%')
     }
    }
   ```

2. 第二个页面返回到第一个页面

   在第二个页面中，返回按钮绑定`onClick`事件，单击按钮时返回到第一页。

   ```ArkTS
   // Second.ets
    import { BusinessError } from '@kit.BasicServicesKit';
    @Entry
    @Component
    struct Second {
     @State message: string = 'Hi there';
     build() {
       Row() {
         Column() {
           Text(this.message)
             .fontSize(50)
             .fontWeight(FontWeight.Bold)
           Button() {
             Text('Back')
               .fontSize(30)
               .fontWeight(FontWeight.Bold)
           }
           .type(ButtonType.Capsule)
           .margin({
             top: 20
           })
           .backgroundColor('#0D9FFB')
           .width('40%')
           .height('5%')
           // 返回按钮绑定onClick事件，单击按钮时返回到第一页
           .onClick(() => {
             console.info(`Succeeded in clicking the 'Back' button.`)
          // 获取UIContext
             let uiContext: UIContext = this.getUIContext();
             let router = uiContext.getRouter();
             try {
               // 返回第一页
               router.back()
               console.info('Succeeded in returning to the first page.')
             } catch (err) {
               let code = (err as BusinessError).code; 
               let message = (err as BusinessError).message; 
               console.error(`Failed to return to the first page. Code is ${code}, 
   message is ${message}`)
             }
           })
         }
         .width('100%')
       }
       .height('100%')
     }
    }
   ```

3. 效果预览

   点击Previewer预览，发现点击Next跳转到Second页面，点击Back回到Index页面。

## 三、程序运行结果

电脑的预览效果如下：

<img src="/chunk.github.io/images/屏幕截图 2025-09-08 140223.png" style="zoom:50%;" />

## 问题总结与体会

##### 问题总结

添加完第二个页面后进行预览时发生了报错，清除缓存后重新运行了项目，发现是ArkTS 编译器找不到 `Second.ets` 文件对应的模块信息，命名时写为了`second`导致错误。

##### 实验体会

1. 初步掌握了HarmonyOS应用开发的基本流程，熟悉了DevEco Studio开发环境的使用和ArkTS语言的基础语法。

2. 通过亲手创建第一个应用，对声明式UI开发有了直观认识，为后续深入学习奠定了基础。

