import React, {useEffect, useState} from "react";
import Navbar from "./Navbar";
import PhotoGallery from "./PhotoGallery";
import TextField from "@mui/material/TextField";
import {FormControl, InputLabel, Select, SelectChangeEvent} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

type Photo = {
    id: number;
    src: string;
    title: string;
    link: string;
};


type SortOption = {
    label: string;
    value: string;
    sortFn: (a: Photo, b: Photo) => number;
};

const sortOptions: SortOption[] = [
    {
        label: "A-Z",
        value: "alphabetical",
        sortFn: (a: Photo, b: Photo) => a.title.localeCompare(b.title),
    },
    {
        label: "Z-A",
        value: "reverse_alphabetical",
        sortFn: (a: Photo, b: Photo) => b.title.localeCompare(a.title),
    },
];

const Home: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([
        {
            id: 1,
            src: './concerts.jpg',
            title: "CONCERTS",
            link: '/concerts'
        },
        {
            id: 2,
            src: './food.jpg',
            title: "FOOD",
            link: '/food'
        },
        {
            id: 3,
            src: './movie.jpg',
            title: "MOVIES",
            link: '/movies'
        },
        {
            id: 4,
            src: './gaming.jpg',
            title: "GAMING",
            link: '/gaming'
        },
        {
            id: 5,
            src: './sports.jpg',
            title: "SPORTS",
            link: '/sports'
        },
        {
            id: 6,
            src: './arts.jpg',
            title: "ARTS",
            link: '/arts'
        },
        {
            id: 7,
            src: './theater.jpg',
            title: "THEATER",
            link: '/theater'
        },
        {
            id: 8,
            src: './pets.jpg',
            title: "PETS",
            link: '/pets'
        },
        {
            id: 9,
            src: './charity.jpg',
            title: "CHARITY",
            link: '/charity'
        },
        {
            id: 10,
            src: './festivals.jpg',
            title: "FESTIVALS",
            link: '/festivals'
        },
        {
            id: 11,
            src: './conferences.jpg',
            title: "CONFERENCES",
            link: '/conferences'
        },
        {
            id: 12,
            src: './others.jpg',
            title: "OTHERS",
            link: '/others'
        },
        {
            id: 13,
            src: './travel.jpg',
            title: "TRAVEL",
            link: '/travel'
        },
        {
            id: 14,
            src: './workshops.jpg',
            title: "WORKSHOPS",
            link: '/workshops'
        },
        {
            id: 15,
            src: './product-launch.jpg',
            title: "PRODUCT LAUNCHES",
            link: '/product-launch'
        },
        {
            id: 16,
            src: './comedy.jpg',
            title: "COMEDY",
            link: '/comedy'
        },
        {
            id: 17,
            src: './online.jpg',
            title: "ONLINE",
            link: '/online'
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSortOption, setSelectedSortOption] = useState<string>(
        sortOptions[0].value
    );

    useEffect(() => {
        // sort the photos array based on the selected sort option
        const sortOption = sortOptions.find(
            (option) => option.value === selectedSortOption
        );
        if (sortOption) {
            setPhotos([...photos].sort(sortOption.sortFn));
        }
    }, [selectedSortOption]);
    const filteredPhotos = photos.filter((photo) =>
        photo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortOptionChange = (event: SelectChangeEvent<string>) => {
        setSelectedSortOption(event.target.value);
    };

    return (
        <div style={{backgroundImage: 'url(/background.jpg)', height: '100%'}}>
            <Navbar></Navbar>
            <TextField
                label="Search categories by name"
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{marginRight: '20px', marginTop: '20px', marginBottom: '20px'}}
                style={{width: "30%", backgroundColor: 'white'}}
            />
            <FormControl sx={{marginTop: '20px'}}>
                <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Age"
                    value={selectedSortOption}
                    onChange={handleSortOptionChange}
                    sx={{marginBottom: '20px'}}
                    style={{width: "100%", backgroundColor: 'white'}}
                >
                    {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div style={{maxWidth: '90vw', margin: '0 auto'}}>
                <PhotoGallery photos={filteredPhotos}/>
            </div>

        </div>
    );
};


export default Home;