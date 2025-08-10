# React 组件通信方式

> React 组件间通信是构建复杂应用的核心技能。本文详细介绍了 React 中各种组件通信方式及其使用场景。

## 1. Props 传递 📡

### 父组件向子组件传递数据 🧬

通过 `props` 将数据从父组件传递给子组件。介绍 React + TypeScript 中 Props 的类型定义。

#### 🧑‍💻 基础类型定义

```ts
interface Props {
  string: string;       // 🧵 字符串
  number: number;       // 🔢 数字
  boolean: boolean;     // ✅ 布尔值
  array: string[];      // 📚 字符串数组
  numberArray: number[];// 🔢 数字数组
  object: { id: number; name: string };  // 🧍‍♂️ 对象
  func: (name: string) => void;          // 🛠️ 函数
  any: any;             // ⚠️ 任意类型（尽量避免）
  unknown: unknown;     // 🧩 未知类型（更安全）
}

function BasicProps(props: Props) {
  return <div>{props.string}</div>;
}
```

#### 可选属性（使用 ? 符号）❓

```ts
interface Props {
  required: string;
  optional?: string;       // 可选 💡
  withDefault?: string;    // 可选且有默认值 ⚙️
}

// defaultProps 是一个对象，类型为 Partial<Props>
// 表示它只包含 Props 接口中的部分属性
// Partial<Props> 是 TypeScript 的工具类型，表示 defaultProps 中的属性都是可选的
const defaultProps: Partial<Props> = {
    withDefault: '默认',
};

// 方式1：使用默认参数
function OptionalProps({ required, optional = "default" }: Props) {
  return <div>{optional}</div>;
}

// 方式2：使用 defaultProps
function OptionalProps(props: Props) {
  const { withDefault } = { ...defaultProps, ...props }
  return <div>{withDefault}</div>;
}
```

#### 联合类型

```ts
interface Props {
  size: "small" | "medium" | "large"; // 尺寸 📏
  id: string | number;                // 字符串或数字 🆔
  nullable: string | null;           // 可以为 null 💭
  optional?: string | undefined;     // 可选或 undefined ❓
}
```

#### 泛型组件 🧠

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function GenericList<T>({ items, renderItem }: Props<T>) {
  return (
    <div>
      {items.map((item, index) => renderItem(item))}
    </div>
  );
}

// 使用示例
<GenericList 
  items={[1, 2, 3]} 
  renderItem={(item) => <div key={item}>{item}</div>}
/>
```

#### React 事件类型 🧩

```ts
interface Props {
  // 点击事件
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  // 输入事件
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // 表单提交
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  // 键盘事件
  onKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
```

#### 子组件类型

```ts
interface Props {
  // 普通 children
  children: React.ReactNode;
  // 只接受特定元素类型
  child: React.ReactElement;
  // 字符串类型
  text: string;
  // 多个子元素
  elements: React.ReactElement[];
}
```

#### Enum 类型

```ts
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

interface Props {
  status: Status;
}

function StatusComponent({ status }: Props) {
  return <div>{status}</div>;
}

// 使用
<StatusComponent status={Status.Active} />
```

#### 复杂对象类型

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}

interface Props {
  user: User;
  users: User[];
  updateUser: (user: User) => void;
}
```

#### Record 类型

```ts
interface Props {
  // 键为字符串，值为数字的对象
  scores: Record<string, number>;
  // 键为特定字符串，值为任意类型的对象
  config: Record<'api' | 'timeout', any>;
}
```

> [!TIP] 使用建议
> **类型声明最佳实践**：
> - 使用 interface 而不是 type 来定义 props（除非需要使用联合类型或交叉类型）
> - 将 props 接口命名为 组件名Props
> - 尽可能使用具体类型，避免 any

#### 基础示例

```jsx
// Parent.jsx
function Parent() {
  return <Child message="Hello from parent" />;
}

// Child.jsx
function Child(props) {
  return <div>{props.message}</div>;
}
```

子组件接受父组件传递的 props，props 是一个对象，会作为函数的第一个参数接受传过来的 props 值。

> [!IMPORTANT] 单向数据流
> 我们需要遵守单向数据流，子组件不能直接修改父组件的 props。
> 
> 在 React 源码中会使用 `Object.freeze` 冻结 props，限制 props 的修改。
> 
> Object.freeze() 静态方法可以使一个对象被冻结。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。被冻结的对象不能再被更改：不能添加新的属性，不能移除现有的属性，不能更改它们的可枚举性、可配置性、可写性或值，对象的原型也不能被重新指定。

### 子组件向父组件传递数据 🔄

通过传递回调函数给子组件，子组件调用该回调函数将数据传回父组件。

```jsx
// Parent.jsx
function Parent() {
  const handleChildData = (data) => {
    console.log('Data from child:', data);
  };

  return <Child onDataSend={handleChildData} />;
}

// Child.jsx
function Child(props) {
  return (
    <button onClick={() => props.onDataSend('Hello from child')}>
      Send to parent
    </button>
  );
}
```

## 2. Context（跨层级组件通信）🌐

**跨层级组件通信**：使用 `React.createContext` 创建上下文，通过 `Provider` 提供数据，子组件通过 `Consumer` 或 `useContext` 钩子获取数据。

首先创建一个主题切换的 Context 组件 ThemeContext：

```tsx
import React, { createContext, useState, useContext } from 'react';

// 定义主题类型
type Theme = 'light' | 'dark';

// 定义 Context 的类型
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 创建 Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 创建 Provider 组件
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 创建自定义 Hook 来使用 Context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

然后在应用的根组件中使用 Provider：

```tsx
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Content from './components/Content';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar />
        <Content />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

创建导航栏组件，使用 Context：

```tsx
import { useTheme } from '../context/ThemeContext';

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar ${theme}`}>
      <h1>我的应用</h1>
      <button onClick={toggleTheme}>
        切换主题 (当前: {theme})
      </button>
    </nav>
  );
}

export default Navbar;
```

创建内容组件，同样使用 Context：

```tsx
import { useTheme } from '../context/ThemeContext';

function Content() {
  const { theme } = useTheme();

  return (
    <main className={`content ${theme}`}>
      <h2>内容区域</h2>
      <p>当前主题: {theme}</p>
    </main>
  );
}

export default Content;
```

## 3. 状态管理库 📦

> [!NOTE] 全局状态管理
> 使用状态管理库如 Redux、MobX、`zustand` 或 Recoil 来管理全局状态，组件通过订阅状态或派发动作来通信。

## 4. 事件总线（Event Bus）🚌

> [!TIP] 发布-订阅模式
> 使用自定义事件总线或第三方库（如 `mitt`）来实现组件间的通信。

参考库：[mitt](https://github.com/developit/mitt)

### 事件总线实现

**事件总线 (`eventBus.ts`)**

```ts
// 定义事件类型
interface EventMap {
  'custom-event': { message: string };
  // 可以扩展其他事件
}

const eventBus = {
  // 订阅事件
  on<K extends keyof EventMap>(event: K, callback: (e: CustomEvent<EventMap[K]>) => void) {
    document.addEventListener(event, callback as EventListener);
  },

  // 触发事件
  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },

  // 取消订阅
  off<K extends keyof EventMap>(event: K, callback: (e: CustomEvent<EventMap[K]>) => void) {
    document.removeEventListener(event, callback as EventListener);
  },
};

export default eventBus;
```

> [!NOTE] 特性说明
> 1. **类型安全**：使用泛型 `K extends keyof EventMap` 确保事件名称和数据类型匹配。`EventMap` 定义了事件名称及其对应的数据类型。
> 2. **可扩展性**：可以在 `EventMap` 中添加更多事件类型。
> 3. **导出事件总线**：使用 `export default` 导出 `eventBus`，方便其他模块使用。

**组件 A (`ComponentA.tsx`)**

```tsx
import React from 'react';
import eventBus from './eventBus';

const ComponentA: React.FC = () => {
  const sendData = () => {
    eventBus.emit('custom-event', { message: 'Hello from ComponentA' });
  };

  return <button onClick={sendData}>发送数据</button>;
};

export default ComponentA;
```

> [!TIP] 组件 A 特点
> 1. **类型推断**：使用 `React.FC` 定义函数组件，自动推断 `props` 类型。
> 2. **事件触发**：调用 `eventBus.emit` 时，TypeScript 会检查事件名称和数据类型的正确性。

**组件 B (`ComponentB.tsx`)**

```tsx
import React, { useEffect } from 'react';
import eventBus from './eventBus';

const ComponentB: React.FC = () => {
  useEffect(() => {
    const handler = (e: CustomEvent<{ message: string }>) => {
      console.log('Received data:', e.detail);
    };

    // 订阅事件
    eventBus.on('custom-event', handler);

    // 清理函数：取消订阅
    return () => {
      eventBus.off('custom-event', handler);
    };
  }, []);

  return <div>ComponentB is listening...</div>;
};

export default ComponentB;
```

> [!IMPORTANT] 组件 B 特点
> 1. **类型安全**：`handler` 函数的参数 `e` 明确为 `CustomEvent<{ message: string }>`，确保数据类型正确。
> 2. **清理函数**：在 `useEffect` 的清理函数中取消订阅事件，避免内存泄漏。
> 3. **清晰的日志**：打印日志时增加描述性内容，便于调试。

**使用示例 (`App.tsx`)**

```tsx
import React from 'react';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

const App: React.FC = () => {
  return (
    <div>
      <h1>Event Bus Example</h1>
      <ComponentA />
      <ComponentB />
    </div>
  );
};

export default App;
```

### 工作流程

> [!NOTE] 事件总线通信流程
> 1. 用户点击 `ComponentA` 中的按钮
> 2. `ComponentA` 触发 `'custom-event'` 事件，并传递数据 `{ message: 'Hello from ComponentA' }`
> 3. `ComponentB` 监听到 `'custom-event'` 事件，并打印数据：
>    ```
>    Received data: { message: 'Hello from ComponentA' }
>    ```
> 4. 当 `ComponentB` 卸载时，`useEffect` 的清理函数会取消订阅事件

### CustomEvent 和 Event 的区别

`CustomEvent` 和 `Event` 都是用于创建和触发事件的浏览器原生 API，但它们有一些关键区别：

| 特性 | `Event` | `CustomEvent` |
|------|---------|---------------|
| **数据传递** | 不支持 | 支持，通过 `detail` 属性 |
| **用途** | 创建普通事件（如 `click`） | 创建自定义事件，携带额外数据 |
| **兼容性** | 所有现代浏览器和 IE9+ | 现代浏览器广泛支持，IE11 需要 polyfill |
| **构造函数参数** | `type`, `options`（`bubbles`, `cancelable`） | `type`, `options`（`detail`, `bubbles`, `cancelable`） |

---

> 💡 **总结**：React 组件通信方式各有特点，选择合适的方式能让你的应用更加高效和易维护。Props 适合父子组件，Context 适合跨层级，状态管理库适合复杂全局状态，事件总线适合解耦的组件通信。
