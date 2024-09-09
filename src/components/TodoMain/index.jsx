import './TodoMain.css'

export function TodoMain({children}){
    return(
        <main className='Container-Main'>
        {children}
        </main>
    );
}