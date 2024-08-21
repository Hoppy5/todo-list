export async function fetchJSON(url, options = {}){
    const header = {accept:'application/json', ...options.headers}
    const r = await fetch(url, {...options, header})
    if(r.ok){
        return r.json()
    }
    throw new Error('Erreur serveur',{cause:r})
}