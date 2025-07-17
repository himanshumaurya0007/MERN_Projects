// src/pages/admin/RecentBookings.jsx
import { useQuery } from '@tanstack/react-query';
import { getRecentBookings } from '../../services/bookingService';
import {
    Users,
    CalendarDays,
    Clock3,
    Mail,
    MapPin,
} from 'lucide-react';

export default function RecentBookings() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['recentBookings'],
        queryFn: getRecentBookings,
    });

    const bookings = data?.data || [];

    if (isLoading) {
        return <p className="text-center text-gray-600 animate-pulse">Loading bookings...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-600 font-medium">
                Failed to load recent bookings. Please try again later.
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Recent Bookings
            </h2>

            <div className="overflow-x-auto rounded shadow">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="p-3 text-left">User</th>
                            <th className="p-3 text-left"><Mail className="inline w-4 h-4 mr-1" />Email</th>
                            <th className="p-3 text-left"><CalendarDays className="inline w-4 h-4 mr-1" />Date</th>
                            <th className="p-3 text-left"><Clock3 className="inline w-4 h-4 mr-1" />Hours</th>
                            <th className="p-3 text-left"><MapPin className="inline w-4 h-4 mr-1" />Venue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b, idx) => (
                            <tr
                                key={b._id}
                                className={`border-t text-gray-800 text-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                    } hover:bg-blue-50 transition duration-200`}
                            >
                                <td className="p-3 font-medium">{b.userName}</td>
                                <td className="p-3">{b.userEmail}</td>
                                <td className="p-3">
                                    {new Date(b.bookingDate).toLocaleDateString()}
                                </td>
                                <td className="p-3">{b.hoursBooked} hr</td>
                                <td className="p-3">{b.venue?.name || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
