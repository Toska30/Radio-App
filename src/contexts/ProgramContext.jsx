import { useState, useEffect, createContext} from "react"
export const ProgramContext= createContext();

const ProgramContextProvider=(props)=>{
  const [programs, setPrograms]= useState(null);
  const [allPrograms, setAllPrograms] = useState(null);
  const [episodes] = useState(null);
  const [CategorisedPrograms, setCategorisedPrograms]=useState(null)
  const [program, setProgram]= useState(null);


  useEffect(() => {
    getAllPrograms();
  }, [])

//all programs
  const getAllPrograms = async ()=>{
    let programs = await fetch (`/api/v1/programs/allprogram`);
    programs = await programs.json();
    setAllPrograms(programs)
  }


   //categorised prg
   const getCategorisedPrograms = async (categoryId)=>{
    let programs = await fetch(`/api/v1//programs/categories/${categoryId}`);
    programs = await programs.json();
    let sorted =[...programs].sort((a,b)=>(a.name >b.name ? 1: -1))
    setCategorisedPrograms(sorted);
  }

  //Prg by prg id 
  const getProgramByProgramId =async (programId)=>{
      let program = await fetch(`/api/v1/programs/allprogram/${programId}`);
      program = await program.json();
      setProgram(program)
    }

//prg by channeliD
  const getProgByChannelId = async (channelId)=>{
    let programs = await fetch(`/api/v1/programs/${channelId}`);
    programs = await  programs.json();
    let sorted =[...programs].sort((a,b)=>(a.name > b.name ? 1: -1))
    setPrograms(sorted);
  }


  const values ={


    allPrograms,
    programs,
    program,
    getProgramByProgramId,
    getCategorisedPrograms,
    CategorisedPrograms,
    getProgByChannelId, 
    episodes

  }

  return (
  <ProgramContext.Provider value ={values}>
    {props.children }
  </ProgramContext.Provider>
  )

}

export default ProgramContextProvider