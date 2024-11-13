const messages = [
    "看什么看，你来错地方了，这里什么也没有",
    "阿伟，你又在乱逛了，去玩游戏好不好"
]

export default function NotFound() {
    return (
        <div className="h-full w-full flex flex-col justify-center items-center select-none">
            <h1 className="mx-auto my-7">404</h1>
            <span>{messages[Math.floor(Math.random() * messages.length)]}</span>
        </div>
    );
}
