import Header from './components/Header'
export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html><body style={{margin:0, background:'#F6F1E9'}}>
      <Header/>{children}
    </body></html>
  )
}