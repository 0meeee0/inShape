const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true    
        },
        organizer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
        date: {
            type: Date,
            required: true
        }
    },{
        timestamps: true
    }
)

const Event = mongoose.model("Event", eventSchema)

module.exports = Event