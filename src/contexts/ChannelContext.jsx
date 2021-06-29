import { useEffect, createContext, useState,  } from "react";

export const ChannelContext = createContext();

const ChannelContextProvider = (props) => {
  const [singleChannel, setSingleChannel] = useState(null);
  const [channels, setChannels] = useState(null);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    getAllChannels();
  }, []);

  //channel by id 
  const getChannelById = async (channelId) => {
    let fetchedchannel = await fetch(`/api/v1/channels/${channelId}`);
    fetchedchannel = await fetchedchannel.json();
    if (fetchedchannel) {
      setSingleChannel(fetchedchannel);
    }
  };


//all channels
  const getAllChannels = async () => {
    let fetchedchannels = await fetch("/api/v1/channels");
    fetchedchannels = await fetchedchannels.json();
    if (fetchedchannels) {  
      setChannels(fetchedchannels);
    }
  };

//channel schedule
  const getChannelSchedule = async (channelId, date) => {
    let fetchedschedule = await fetch(
      `/api/v1/channels/schedule/${channelId}?date=${date}`
    );
    fetchedschedule = await fetchedschedule.json();
    setSchedule(fetchedschedule);
  };

  const values = {schedule,singleChannel,setChannels,channels,getChannelSchedule,getChannelById};

  return (
    <ChannelContext.Provider value={values}>
      {props.children}
    </ChannelContext.Provider>
  );
};

export default ChannelContextProvider;
