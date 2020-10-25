import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';

import SidebarOption from './SidebarOption';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Sidebar() {

    const [channels, setChannels] = useState([]);
    const [{ user }] = useStateValue();

    // Run code ONCE when the sidebar component loads
    // Run again if dependency changes
    useEffect(() => {
        // Go into db => collection and take a snapshot of the collection (realtime)
        db.collection('rooms').onSnapshot(snapshot => (
            // Go to the snaphot => doc and map (Loop through every single doc)
            // And for every doc do...
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
            })))
        ))
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <div className="sidebar_info">
                    <h2>Tony Quach Co</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </div>
                <CreateIcon />
                
            </div>
            <SidebarOption Icon={InsertCommentIcon} title={"Threads"} />
            <SidebarOption Icon={InboxIcon} title={"Mentions & Reactions"} />
            <SidebarOption Icon={DraftsIcon} title={"Saved"} />
            <SidebarOption Icon={BookmarkBorderIcon} title={"Channel browser"} />
            <SidebarOption Icon={PeopleAltIcon} title={"People & User groups"} />
            <SidebarOption Icon={AppsIcon} title={"Apps"} />
            <SidebarOption Icon={FileCopyIcon} title={"File brower"} />
            <SidebarOption Icon={ExpandLessIcon} title={"Show less"} />

            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title={"Channels"} />
            <hr />
            <SidebarOption Icon={AddIcon} title={"Add Channel"} addChannelOption />

            {/* Connect tp Db and list all the channels */}
            {channels.map(channel => (
                <SidebarOption title={channel.name} id={channel.id} />
            ))}
        </div>
    )
}

export default Sidebar
