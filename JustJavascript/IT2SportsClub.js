

class Club{
    constructor(name){
        this.name = name 

        this.members = []
    }

    addMember(memberToAdd){
        if(memberToAdd instanceof ClubMember == false){
            console.log("The object wasnt a Member Class")
            return
        }
        
        memberToAdd.club = this.name
        this.members.push(memberToAdd)
    }
}

class ContactInformation{
    constructor(firstName, secondName, birthday, phoneNumber, epost, postNumber, city, address){
        this.firstName = firstName
        this.secondName = secondName
        this.name = `${firstName} ${secondName}`
        this.birthday = birthday
        this.phoneNumber = phoneNumber 
        this.epost = epost 
        this.postNumber = postNumber
        this.city = city 
        this.address = address
    }
}


class ClubMember extends ContactInformation{
    constructor(firstName, secondName, birthday, phoneNumber, epost, postNumber, city, address, sport=null, team="fan", active=false, payed=false){
        super(firstName, secondName, birthday, phoneNumber, epost, postNumber, city, address)
        this.name = `${firstName} ${secondName}`
        this.club = null
        this.sport = sport 
        this.team = team 
        this.active = active 
        this.payed = payed
    }

    pay(){
        this.payed = true
    }
}

Ravn = new Club("BNR")
Niko = new ClubMember("Muheko", "Nikolas", "20.10.2022", "93471331", "13nikmuh@gmail.com", "119", "Tenfjord", "Tenfjordvegen 119", "Football", "G19", true, true)
Ravn.addMember(Niko)

console.log(Niko)
console.log(Ravn.members)