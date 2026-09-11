export default function Coaching(){
const cards = [
{title:"Divorce Coaching", text:"For individuals in pre-separation, separation, or post-divorce stages. We work on emotional regulation, decision-making, communication boundaries, and rebuilding identity and confidence."},
{title:"Counselling & Stress Management", text:"Evidence-based tools for anxiety, chronic stress, overwhelm, and burnout. CBT, mindfulness, grounding, and practical coping strategies you can use daily."},
{title:"Clinical Support & Wellbeing", text:"Life transitions, grief, self-esteem, and personal growth. A non-judgemental space to explore patterns, heal, and create a more aligned future."},
]
return (
<main style={{background:'#F8F4EE', padding:'60px', fontFamily:'Georgia, serif'}}>
<h1 style={{fontSize:40, textAlign:'center'}}>Coaching Specialties</h1>
<div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, maxWidth:1000, margin:'40px auto'}}>
{cards.map(c=><div key={c.title} style={{background:'white', padding:24, borderRadius:14, boxShadow:'0 8px 20px rgba(0,0,0,0.06)'}}><h3>{c.title}</h3><p style={{fontFamily:'Arial', fontSize:13, lineHeight:1.6, marginTop:10}}>{c.text}</p></div>)}
</div>
</main>
)}