using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activites.Dto;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activites
{
    public class List
    {
        public class Query : IRequest<Result<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly DataContext _db;
            private readonly IMapper _mapper;
            public Handler(DataContext db, IMapper mapper)
            {
                _mapper = mapper;
                _db = db;

            }
            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _db.Activities
                        .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                        .ToListAsync();


                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}