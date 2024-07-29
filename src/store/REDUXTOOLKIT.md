### Redux Toolkit 提供了一些核心功能，其中包括：
- @reduxjs/toolkit 包： Redux Toolkit 提供了一个包来集成常用的 Redux 工具和中间件。
- createSlice： 通过 createSlice 函数，可以轻松地创建包含 reducer 和 action 的 “slice”。
- configureStore： 用于创建 Redux store 的函数，集成了常用的 middleware。
- createAsyncThunk： 简化异步操作的创建，使得处理异步逻辑更加方便。
- createSelector： 用于创建可记忆化的选择器，提高状态选择的性能

### Redux Toolkit 相比于传统的 Redux 开发方式的优点
- 简化开发流程： Redux Toolkit 提供了一系列工具函数和模块，可以大大简化 Redux 的开发流程，减少样板代码。
- 减少样板代码： 通过使用 createSlice 和 createAsyncThunk，相比于 redux 可以减少大量的重复代码，使得代码更加简洁清晰。
- 提高开发效率： Redux Toolkit 提供了一套标准化的工具和模式，使得开发者可以更加专注于业务逻辑的实现，提高开发效率
  ,和使用redux相比，大大降低了书写状态管理时出现的失误。
- 与现有 Redux 生态的兼容性： Redux Toolkit 与传统的 Redux 应用和中间件兼容，可以无缝集成到现有项目中，
  同时也支持 Redux DevTools 调试工具的使用。
